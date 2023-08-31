import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  secure: false,
});

const mailOptions = {
  from: process.env.GMAIL_ALIAS,
  to: 'sirmidgetmikl@gmail.com',
  subject: 'nodemailer test',
  text: 'nodemailer test',
};


export async function GET() {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent: ' + info.response);
    }
  });
  return new Response('email sent');
}