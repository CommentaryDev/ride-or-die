import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import CartItem from "@/components/CartItem";
import Stripe from "stripe";


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const {cartDetails} = await req.json();
    const cartDetailsArray = Object.values(cartDetails) ;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const lineItems = cartDetailsArray.map((item: any) => {
        return {
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        };
    });
    const cusID: string = "cus_PgptKJDyQAzLkl";
    try {
        const session = await await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `https://ride-or-die.benjaminroche.fr/stripe/success`,
            cancel_url: `https://ride-or-die.benjaminroche.fr/stripe/error`,
            customer: cusID,
        });

        return NextResponse.json({sessionId: session.id});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Error creating checkout session"});
    }
}