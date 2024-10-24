import Client from "twilio";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


export const whatsappAuthMessage = async ({
    name,
    otp,
    to,
  }) => {
    try {
      const client = Client(accountSid, authToken);
      const template = `*${otp}* is your verification code. For your security, do not share this code.`;
      return await client.messages
        .create({
          body: template,
          from: `whatsapp:+917025659749`,
          to: `whatsapp:${to}`,
        })
        .then((message) => {
          return { status: true, messageId: message?.sid };
        })
        .catch((err) => {
          console.log(err);
          return { status: false, messageId: err?.message };
        });
    } catch (err) {
      console.log(err);
      return { status: false, messageId: err?.message };
    }
  };

  export const dbConnect = async () => {
    try{
        console.log("DB connecting...")
        await mongoose.connect(process.env.MONGO)
        .then(()=>console.log("DB connected successfully"))
        .catch((err)=>console.log("DB connection error - ",err))
    }
    catch(err){
        throw new Error('mongodb connection error')
    }
}