import nodemailer from 'nodemailer';
import { CronJob } from 'cron';
import { DataStatusResponse, User } from '@/types/backend';
import { UserResponse } from '@/types/frontend';
import { emailTemplate } from './emailTemplate';


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
  from: `BioRxiv Newsletter <${process.env.GMAIL_ALIAS}>`,
  to: '',
  subject: 'Biorxiv articles',
  html: '',
};


async function getUsers(): Promise<User[] | null> {
  const userRes = await fetch(process.env.API_URL + '/api/users');
  const userData: UserResponse = await userRes.json();
  if (userData.error) {
    console.error(userData.error);
    return null;
  } else {
    return userData.result;
  }
}


async function sendEmails(): Promise<null> {
  const dataStatusRes: Response = await fetch(process.env.API_URL + '/api/data');
  const dataStatus: DataStatusResponse = await dataStatusRes.json();
  if (dataStatus.error) {
    console.error(dataStatus.error);
  } else {
    console.log(dataStatus.result);
  }
  const users: User[] | null = await getUsers();
  if (!users) {
    console.error('No users found');
    return null;
  }

  for (let user of users) {
    console.log(`Sending email to ${user.email}`);
    mailOptions.to = user.email;
    mailOptions.html = emailTemplate(user.id);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('email sent: ' + info.response);
      }
    });
  }
  return null;
}


export async function GET() {
  await sendEmails();
  return new Response('Emails sent', {
    headers: {
      'content-type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
    },
    status: 200,
  })
}



export async function POST() {
  if (!activeJob) {
    activeJob = true;
    const job = new CronJob('0 0 8 * * 1', async () => {
      await sendEmails();
    }, null, true, 'America/Chicago');
    job.start();
    console.log('Cron job started');
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