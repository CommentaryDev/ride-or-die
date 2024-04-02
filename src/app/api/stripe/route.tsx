import Stripe from 'stripe';
import prisma from "@/lib/prisma";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhook : string = process.env.STRIPE_WEBHOOK_SECRET as string

async function OrderCreate(lines : any,totalAmount : any, CustomerID: any, PaymentIntentID : any){
  const numberItems= lines.length;
  const user = await prisma.user.findFirst({
    where: {
      email: CustomerID
    }
  })
  if(user){
    const order = await prisma.order.create({
      data: {
        amount: Number(totalAmount/100),
        nb_lines: numberItems,
        user_id: user?.id,
        PaymentIntentID:PaymentIntentID,
      },
      });
      for (const element of lines) {
        const product = await prisma.products.findFirst({
          where: {
            price_id: element.price.id
          }
        })
        if(product){
          const lineorder = await prisma.orderLine.create({
            data: {
              id_order: order.id_order,
              product_name: element.description, 
              stripe_id:element.price.id,
              quantity:Number(element.quantity),
              unitPrice: Number(element.price.unit_amount/100),
              lineTotal: Number(element.amount_total/100),
              productId: product?.id_product,
            },
          });
        }
      }
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
      // Handle post-payment actions here
      const session = event.data.object;
      console.log(session)
      console.log("payment info",event.data)
      console.log(`Payment successful for session ID: ${session.id}`);
      console.log("begin timeout")
      await new Promise(f => setTimeout(f, 7000));
      console.log("end timeout")
      const order = await prisma.order.findFirst({
        where: {
          PaymentIntentID:session.id,
        }
      })
      console.log("myorder",order)
      let orderDetails : String = ""
      if(order){
        const lines = await prisma.orderLine.findMany({
          where: {
            id_order:order.id_order,
          }
        });
        for (const element of lines) {
          orderDetails+="Product :"+element.product_name+"\n Quantity :"+element.quantity+"\n Total:"+element.lineTotal+"\n"
        }
        console.log("lines of the order",lines)
      }
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
        text: `Order number ${order?.id_order} confirmed \n` + orderDetails,
      };
      transporter.sendMail(mailOptions, function (error : any, info : any) {
        if (error) {
          console.log("Error mail")
        } else {
          console.log("Email Sent");
        }
      });
      return Response.json(session)
      break;
    // Add other event types to handle as needed
    case 'checkout.session.completed':
      console.log("there")
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ['line_items'],
        }
      );
      console.log("line item",sessionWithLineItems)
      console.log("the intent",sessionWithLineItems.payment_intent)//the payment intent ID
      const lineItems = sessionWithLineItems.line_items;
      console.log("extract lines",lineItems?.data)
      //Create order
      OrderCreate(lineItems?.data, sessionWithLineItems?.amount_total, sessionWithLineItems?.customer_details?.email,sessionWithLineItems?.payment_intent)
      return Response.json(lineItems)
      break;
    default:
      console.warn(`Unhandled event type: ${event?.type}`);
      return new Response ("error")
  }

}
