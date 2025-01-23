import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  secure: true,
});

const mailOptions = {
  from: `BioRxiv Newsletter <${process.env.GMAIL_ALIAS}>`,
  to: '',
  subject: 'Weekley Biorxiv articles',
  html: '',
}

function sendEmail(address: string) {
  mailOptions.to = address;
  mailOptions.html = 'This is a test email from the API route';
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('[server] email sent: ' + info.response);
    }
  });
}

// testing
// export function GET(request: Request) {
//   sendEmail('sirmidgetmikl@gmail.com');
//   return new Response('Email sent');
// }