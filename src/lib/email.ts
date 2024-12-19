import { MailtrapClient } from "mailtrap";
// import nodemailer from "nodemailer";

type profile = { name: string; email: string };

const TOKEN = process.env.MAILTRAP_TOKEN!;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT!;

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@sharpener.design",
  name: "Point",
};

interface EmailOptions {
  profile: profile;
  subject: "verification" | "forget-password" | "password-changed";
  linkUrl?: string;
}

// const generateMailTransporter = () => {
//   // hackeratheart@gmail.com
//   // const transport = nodemailer.createTransport({
//   //   host: "sandbox.smtp.mailtrap.io",
//   //   port: 2525,
//   //   auth: {
//   //     user: "bcab674080b230",
//   //     pass: "7fc09eafd1ea51",
//   //   },
//   // });

//   //deepak@pencilhacker.com
  
//   var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "73efceaf4744a2",
//       pass: "c9537de3b480e0"
//     }
//   });

//   return transport;
// };



const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
  //dev
  // const transport = generateMailTransporter();
  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>Please verify your email by clicking on <a href="${linkUrl}">this link</a> </h1>`,
  // });
  console.log('from verifivation function', profile.email)
  const recipients = [
    {
      email: profile.email,
    },
  ];
  // prod
  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "4b8a1379-4245-4900-a8ca-6a4f0d8632cd",
    template_variables: {

      "user_name": profile.name,

      "verify_link": linkUrl

    }
  });
};

const sendForgetPasswordLink = async (profile: profile, linkUrl: string) => {

  //dev
  // const transport = generateMailTransporter();

  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>Click on <a href="${linkUrl}">this link</a> to reset your password.</h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];

  //prod
  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "b2126ede-7c25-4d88-881f-7c9f01263b69",
    template_variables: {

      "user_name": profile.name,

      "next_step_link": linkUrl

    }
  });
};

const sendUpdatePasswordConfirmation = async (profile: profile) => {
  // const transport = generateMailTransporter();

  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>We changed your password <a href="${process.env.SIGN_IN_URL}">click here</a> to sign in.</h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];
  // prod
  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "839247f4-148f-4b8b-9a5f-2477924dd358",
    template_variables: {

      "user_name": profile.name

    }
  });
};

export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;

  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl!);
    case "forget-password":
      return sendForgetPasswordLink(profile, linkUrl!);
    case "password-changed":
      return sendUpdatePasswordConfirmation(profile);
  }
};