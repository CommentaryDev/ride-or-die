import Stripe from 'stripe';
import prisma from "@/lib/prisma";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhook : string = process.env.STRIPE_WEBHOOK_SECRET as string
const fs = require('fs');
var nodemailer = require("nodemailer");
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
const axios = require('axios');
async function downloadImage(url: string, filename: string) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(fs.createWriteStream(filename));
    return new Promise((resolve) => response.data.on('end', resolve));
  } catch (error) {
    console.error("Error downloading image:", error);
    // Handle download failure (e.g., return null or throw a specific error)
  }
}

//Create the order and its lines
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

//Create the file localy
async function createInvoice(order : any) {
  console.log("Creating invoice");
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
console.log("drawing the intro text")
page.drawText('This is your invoice', {
  x: 50,
  y: height - 4 * fontSize,
  size: fontSize,
  font: timesRomanFont,
  color: rgb(0, 0.53, 0.71),
})
console.log("after intro text")
  const lines = await prisma.orderLine.findMany({
    where: {
      id_order: order.id_order,
    },
  });

  let yPosition = page.getHeight() - 150; // Keep track of vertical position for content
  const lineSpacing = 120; // Adjust spacing between each product
const productX = 50;
const imageX = 400;
const imageSize = 80;

for (let index = 0; index < lines.length; index++) {
  const element = lines[index];
  const productDescription = `${index + 1}. ${element.product_name} - $${element.unitPrice.toFixed(2)} - Qty: ${element.quantity} - Total Line: $${element.lineTotal.toFixed(2)}`;
  const productY = yPosition - index * lineSpacing;

  try {
    const product = await prisma.products.findFirst({
      where: {
        id_product: element.productId,
      },
    });

    if (product) {
      await downloadImage(product.imageURL, `product-${index}.jpg`);
      const pngImageBytes = fs.readFileSync(`product-${index}.jpg`);
      const pngImage = await pdfDoc.embedJpg(pngImageBytes);

      page.drawText(productDescription, {
        x: productX,
        y: productY,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawImage(pngImage, {
        x: imageX,
        y: productY - imageSize / 2,
        width: imageSize,
        height: imageSize,
      });
    } else {
      console.log("Product not found:", element.productId);
    }
  } catch (error) {
    console.error("Error processing product:", error);
    // Handle error appropriately
  }
}

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Save the PDF
  fs.writeFileSync('invoice.pdf', pdfBytes);

  console.log("Created invoice");
  return 'invoice.pdf';
}


//Send the email
async function sendEmailWithAttachment(filename : any, recipientEmail : string) {
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
    to: recipientEmail,
    subject: "Order confirmed ",
    text: 'Please find attached the invoice for your recent purchase.',
    attachments: [{
      filename: 'invoice.pdf',
      path: filename as string, // <= Here
      contentType: 'application/pdf'
  }]
  };
  transporter.sendMail(mailOptions, function (error : any, info : any) {
    if (error) {
      console.log("Error mail",error)
    } else {
      console.log("Email Sent");
    }
  });
}

//Receive the webhooks
export async function POST(req: any, res: any) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature');
  //Verify the signature
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
// If signature is good, handle the differents kind of events(payment_intent.succeeded/checkout.session.completed)
  switch (event?.type) {
    case 'payment_intent.succeeded':
      // Handle post-payment actions here
      const session = event.data.object;
      console.log(`Payment successful for session ID: ${session.id}`);
      console.log("begin timeout")
      await new Promise(f => setTimeout(f, 7000));
      console.log("end timeout")
      const order = await prisma.order.findFirst({
        where: {
          PaymentIntentID:session.id,
        }
      })
      if(order){
        //Creating invoice pdf
        const invoiceFilename = await createInvoice(order);
        console.log("Invoice created")
        //Email send
        sendEmailWithAttachment(invoiceFilename, 'ben77les@gmail.com');
      }
     
    
       //Delete all localy saved images
       /*console.log("Deleting all local files")
       fs.readdirSync('./').forEach((file : any) => {
        if (file.startsWith('product-') && file.endsWith('.png')) {
            fs.unlinkSync(file);
            console.log(`Deleted ${file}`);
        }
    });*/
    //console.log("Deleting all local files finished")
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
