import express from "express";
import cors from "cors";
import { dbConnect, whatsappAuthMessage } from "./methods.js";
import { User } from "./schema.js";


const app = express();
const datas = {}

app.use(cors());
app.use(express.json());

dbConnect()

app.post('/otp', async  (req,res)=>{
    const {mobile}=req.body
    const otp=Math.floor(1000 + Math.random() * 9000)
    datas[mobile]=otp
    await whatsappAuthMessage({name:"User",otp:otp,to:mobile}).then((data)=>{
        res.send(data)
    })
})

app.post('/login', async (req,res)=>{
    const {mobile,otp}=req.body


    console.log(datas);
    console.log(mobile);
    if(datas[mobile]==otp){
        console.log(datas);
        await User.create({mobile:mobile})
        .then(()=>{
            delete datas[mobile]
            console.log(datas);
            res.send({status:true,message:"success"})
        })
    }else{
        res.send({status:false,message:'incorrect OTP'})
    }
})


app.listen(7001, () => {
    console.log('Server is running on port 7001');
})