import Stripe from 'stripe';
import prisma from "@/lib/prisma";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhook : string = process.env.STRIPE_WEBHOOK_SECRET as string

async function OrderCreate(lines : any,totalAmount : any, CustomerID: any){
  const numberItems= lines.length;
  console.log("amount",totalAmount)
  console.log("nb lines",numberItems)
  const order = await prisma.order.create({
    data: {
      amount: totalAmount,
      nb_lines: numberItems,
      user_id: CustomerID
    },
  });
  for (const element of lines) {
    const lineorder = await prisma.orderLine.create({
      data: {
        id_order: order.id_order,
        product_name: element.description, 
        stripe_id:element.price.id,
        quantity:Number(element.quantity),
        unitPrice: Number(element.price.unit_amount),
        lineTotal: Number(element.amount_total),
      },
    });
  }
}
var nodemailer = require("nodemailer");

export async function POST(req: any, res: any) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature');
  if(!sig){
    console.log("No signature")
    return Response.json({ error: "No signature"})
  }
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig,
      webhook);
      console.log("event",event)
  } catch (err : any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response ("error")
  }

  switch (event?.type) {
    case 'payment_intent.succeeded':
      const session = event.data.object;
      console.log(`Payment successful for session ID: ${session.id}`);
      //Email send
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PW,
        },
      });
    
      var mailOptions = {
        from: {
          name: "Ride or die",
          address: process.env.NODEMAILER_EMAIL,
        },
        to: "ben77les@gmail.com",
        subject: "Order confirmed ",
        text: `Order number ${session.id} confirmed `,
      };
    
      transporter.sendMail(mailOptions, function (error : any, info : any) {
        if (error) {
          console.log("error mail")
        } else {
          console.log("Email Sent");
        }
      });
      // Handle post-payment actions here
      return Response.json(session)
      break;
    // Add other event types to handle as needed
    case 'checkout.session.completed':
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ['line_items'],
        }
      );
      console.log("line item",sessionWithLineItems)
      const lineItems = sessionWithLineItems.line_items;
      console.log("extract lines",lineItems?.data)
      //Create order
      OrderCreate(lineItems?.data, sessionWithLineItems?.amount_total, sessionWithLineItems?.customer)
      return Response.json(lineItems)
      break;
    default:
      console.warn(`Unhandled event type: ${event?.type}`);
      return new Response ("error")
  }

}
