import nodemailer from 'nodemailer';
import { CronJob } from 'cron';


let activeJob = false;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  secure: true,
});

const mailOptions = {
  from: process.env.GMAIL_ALIAS,
  to: 'sirmidgetmikl@gmail.com',
  subject: 'nodemailer test',
  text: 'nodemailer test',
};


function sendEmail() {
  console.log('send email called')
  // pull api data
  // set articles in variable in data route
  // send email
  // in email slug, pull articles from data route
}


export async function POST() {
  if (!activeJob) {
    activeJob = true;
    const job = new CronJob('*/5 * * * * *', () => {
      sendEmail();
    });
    job.start();
    return new Response('Cron job started', {
      headers: {
        'content-type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
      status: 200,
    })
  } else {
    return new Response('Cron job already active', {
      headers: {
        'content-type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
      status: 200,
    })
  }

}


// export async function POST() {
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('email sent: ' + info.response);
//     }
//   });
//   return new Response('email sent');
// }