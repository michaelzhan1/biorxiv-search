import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getAllUserInfo } from "./db.js";
import { getDateRange, prettyFormat } from "./date.js";

dotenv.config();

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
  subject: 'Weekly Biorxiv articles',
  html: '',
}

// the emails don't need to include actual articles, just a link to the site
async function sendEmails() {
  const allUsers = await getAllUserInfo();
  const [startDate, endDate] = getDateRange();
  const prettyStartDate = prettyFormat(startDate);
  const prettyEndDate = prettyFormat(endDate);

  for (let user of allUsers) {
    mailOptions.to = user.email;
  }


  // dummy email for now
  mailOptions.to = "sirmidgetmikl@gmail.com"
  mailOptions.html = "new test email"
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export { sendEmails };