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
  attachments: [
    {
      filename: 'biorxiv.png',
      path: './assets/biorxiv.png',
      cid: 'biorxiv'
    }
  ]
}

function makeEmailContent(user) {
  const [startDate, endDate] = getDateRange();
  const prettyStartDate = prettyFormat(startDate);
  const prettyEndDate = prettyFormat(endDate);

  return `
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>bioRxiv Email</title>
    </head>

    <body>
      <table>
        <tr>
          <td>
            <img src="cid:biorxiv" alt="bioRxiv logo" height="60px">
          </td>
        </tr>
        <tr>
          <td>
            <p style="font-size: 16px;">
              Click to view the latest bioRxiv articles from
              <strong>${prettyStartDate}</strong>
              to
              <strong>${prettyEndDate}</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 10px;">
            <a href="${process.env.FRONTEND_URL}/view?id=${user.id}"
              style="background-color: #be2736;
                     padding: 10px;
                     margin-top: 10px;
                     font-size: 16px;
                     text-decoration: none;
                     border-radius: 5px;
                     color: white"
            >
              View Articles
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 15px;">
            <a href="${process.env.FRONTEND_URL}/edit?id=${user.id}"
              style="color: black;
                     text-decoration: underline;
                     font-size: 12px;"
            >
              Edit search preferences or unsubscribe
            </a>
          </td>
        </tr>
      </table>
    </body>

    </html>
  `
}

// the emails don't need to include actual articles, just a link to the site
async function sendEmails() {
  const allUsers = await getAllUserInfo();

  for (let user of allUsers) {
    mailOptions.to = user.email;
    mailOptions.html = makeEmailContent(user);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

await sendEmails();

export { sendEmails };