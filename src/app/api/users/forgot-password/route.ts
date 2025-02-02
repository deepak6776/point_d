import PasswordResetTokenModel from "@/models/passwordResetTokenModel";
import UserModel from "@/models/userModel";
import { ForgetPasswordRequest } from "@/types";
import { NextResponse } from "next/server";
import crypto from "crypto";
import startDb from "@/lib/db";
import { sendEmail } from "@/lib/email";


export const POST = async (req: Request) => {
  try {
    const { email } = (await req.json()) as ForgetPasswordRequest;
    if (!email)
      return NextResponse.json({ error: "Invalid email!" }, { status: 401 });

    await startDb();
    const user = await UserModel.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found!" }, { status: 404 });

    // generate the token and send the link to the given email

    await PasswordResetTokenModel.findOneAndDelete({ user: user._id });
    const token = crypto.randomBytes(36).toString("hex");
    await PasswordResetTokenModel.create({
      user: user._id,
      token,
    });

    // send the link to the given email
    const resetPassLink = `${process.env.PASSWORD_RESET_URL}?token=${token}&userId=${user._id}`;

    // var transport = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //         user: "73efceaf4744a2",
    //         pass: "c9537de3b480e0"
    //     }
    // });

    // await transport.sendMail({
    //     from: 'verification@nextecom.com',
    //     to: user.email,
    //     html: `<h1>Please Click 
    //      <a href="${resetPassLink}">this link</a>to reset password</h1>`
    // })

    await sendEmail({
      profile: { name: user.name, email: user.email },
      subject: "forget-password",
      linkUrl: resetPassLink,
    });

    return NextResponse.json({ message: "Please check your email." });
    
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
};