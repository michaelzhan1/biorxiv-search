import { sendEmails } from '../utils/email.js';

async function sendEmailHandler(req, res) {
  await sendEmails();
  res.status(200).json({ message: "Emails sent" });
}

export { sendEmailHandler };