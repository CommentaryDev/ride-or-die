import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import CartItem from "@/components/CartItem";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const {cartDetails, email} = await req.json();
    console.log("cartDetails",cartDetails)
    const cartDetailsArray = Object.values(cartDetails) ;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const lineItems = cartDetailsArray.map((item: any) => {
        return {
            price: item.id,
            quantity: item.quantity,
        };
    });
    console.log("lineitems test",lineItems)
    let customerId;
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user?.CustomerID) {
        customerId = user.CustomerID;
    } else {
        // Create a new customer
        const customer = await stripe.customers.create({
            name: user?.name as string,
            email: user?.email as  string

        });
        const custID = await prisma.user.update({
            where: {
                email: email,
              },
              data: {
                CustomerID: customer.id,
              },
        })
        customerId = customer.id;
    }
    try {
        const session = await await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `https://ride-or-die.benjaminroche.fr/stripe/success`,
            cancel_url: `https://ride-or-die.benjaminroche.fr/stripe/error`,
            customer: customerId,
        });

        return NextResponse.json({sessionId: session.id, url: session.url});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Error creating checkout session"});
    }
}