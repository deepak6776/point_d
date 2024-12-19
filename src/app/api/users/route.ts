import startDb from "@/lib/db";
import { sendEmail } from "@/lib/email";
import UserModel from "@/models/userModel";
import { NewUserRequest } from "@/types"
import { NextResponse } from "next/server";
import crypto from "crypto"
import EmailVerificationToken from "@/models/emailVerificationToken";



export const POST = async (req: Request) => {
  const body = await req.json() as NewUserRequest;

  await startDb();
  const userExists = await UserModel.findOne({email:body.email})
  if(!userExists){
    const newUser = await UserModel.create({
      ...body
    })

    console.log(newUser)

    const token = crypto.randomBytes(36).toString("hex");
  await EmailVerificationToken.create({
    user: newUser._id,
    token,
  });

  const verificationUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${newUser._id}`;

  await sendEmail({
    profile: { name: newUser.name, email: newUser.email },
    subject: "verification",
    linkUrl: verificationUrl,
  });

    return NextResponse.json(newUser)
  
  }

  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  

}