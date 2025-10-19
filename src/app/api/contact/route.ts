import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Create a transporter object using the default SMTP transport
  // You will need to configure this with your own email provider
  // For example, for Gmail, you would use something like:
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.GMAIL_USER,
  //     pass: process.env.GMAIL_PASS,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'account.user', // generated ethereal user
        pass: 'account.pass'  // generated ethereal password
    }
  });

  // Set up email data
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'tanishqparihar3@gmail.com', // Change this to your email address
    subject: 'New message from GitLens.AI contact form',
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
