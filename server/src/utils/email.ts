import FormData from "form-data";
import Mailgun from "mailgun.js";

import { env } from "@/env";

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailOptions) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: env.MAILGUN_API_KEY,
  });
  try {
    const data = await mg.messages.create(env.MAILGUN_DOMAIN, {
      from: `Daksh Purohit <noReply@${env.MAILGUN_DOMAIN}>`,
      to,
      subject,
      text,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
