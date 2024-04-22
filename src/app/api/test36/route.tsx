import jsPDF from 'jspdf';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
const filename = `invoice.pdf`;
var nodemailer = require("nodemailer");

export async function POST(req: any, res: any) {
  console.log("creating")
  const pdfDoc = await PDFDocument.create();
  // do pdf stuff  
  // Embed the Times Roman font
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  // Add a blank page to the document
  const page = pdfDoc.addPage()

  // Get the width and height of the page
  const { width, height } = page.getSize()

  // Draw a string of text toward the top of the page
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const buffer = await pdfDoc.save();
  console.log("generated")
  
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
    to: 'ben77les@gmail.com',
    subject: "Order confirmed ",
    text: 'Please find attached the invoice for your recent purchase.',
    attachments: [{
      filename: 'invoice.pdf',
      content: Buffer.from(buffer), // Convert Uint8Array to Buffer
      contentType: 'application/pdf'
    }]
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log("Error mail", error)
    } else {
      console.log("Email Sent");
    }
  });
  return Response.json({ message: "All good" })
}
