import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import userModel, { IUser } from "../models/user";
import jwt,{Secret} from "jsonwebtoken";
import ejs from "ejs"
import path from "path";
import sendMail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";
import bcrypt from "bcryptjs"
require("dotenv").config()
interface IRegistrationBody{
    name:string;
    email:string;
    password:string;
    avatar?:string;
}
export const registerUser = CatchAsyncError(async (req:Request,res:Response,next:NextFunction) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password)
            throw new ErrorHandler('Please fill all required fields.',403)
        const isEmailExist = await userModel.findOne({
            email
        })
        if(isEmailExist)
            return next(new ErrorHandler('Email Already Exists',402));
        const user:IRegistrationBody = {
            name,
            email,
            password
        }
        const {token,activationCode} = getActivationCode(user);
        const data ={
            name:user.name,
            otp:activationCode
        }
        const html = await ejs.renderFile(path.join(__dirname,"../mailTemplates/activationTemplate.ejs"),data);
        try {
            await sendMail({
                email:user.email,
                subject:'Activate Your Account',
                template:'activationTemplate.ejs',
                data
            })
            res.status(201).json({
                success:true,
                message:'Please check your inbox to activate your account.',
                activationToken:token
            })
        } catch (error) {
            
        }
    } catch (err:any) {
        console.log(err)
        return next(new ErrorHandler(err.mesaage,err.statusCode))
    }
})

const getActivationCode = (user:IRegistrationBody) => {
    const activationCode = generateOTP();
    const token = jwt.sign({
        user,activationCode
    },process.env.ACTIVATION_SECRET as Secret,
    {
        expiresIn:"5m"
    })
    return {activationCode,token}
}

const generateOTP = () => { 
    let digits = 
'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)%digits.length];
    }
    return OTP;
}

interface IActivationRequest{
    activationCode:string;
    token:string;
}

export const activateUser = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {activationCode,token} = req.body as IActivationRequest
        const newUser: {user:IUser; activationCode:string} = jwt.verify(
            token,
            process.env.ACTIVATION_SECRET as string
        ) as  {user:IUser; activationCode:string}
        if(newUser.activationCode != activationCode)
            return next(new ErrorHandler('Invalid OTP.',500));
        const userExist = await  userModel.findOne({
            email:newUser.user.email
        })
        if(userExist)
            return next(new ErrorHandler('User Already Exists.',402));
        const user = await userModel.create({
            name:newUser.user.name,
            email:newUser.user.email,
            password:newUser.user.password
    })
    res.status(201).json({
        success:true,
        message:'User registered Successfully.',
        user
    })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,401))
    }
})
interface ILoginRequest{
    email: string;
    password:string;
}
export const loginUser = CatchAsyncError(async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {email,password} =req.body as ILoginRequest
        if(!email || !password){
            return next(new ErrorHandler('Please fill all the fields.',401));
        }
        console.log("Here")
        const userExist = await userModel.findOne({
            email
        }).select("+password")
        if(!userExist)
            return next(new ErrorHandler('No User with this email ID is registered.',402));
        console.log(userExist)
        const ress = await bcrypt.hash(password,10)
        console.log(ress)
        const passwordCompare = await userExist.comparePassword(password);
        console.log(passwordCompare)
        if(!passwordCompare)
            return next(new ErrorHandler('Incorrect Password.Please try again.',500));
        console.log("Here2")
        sendToken(userExist,201,res);
        console.log("Here3")
    } catch (error:any) {
         return next(new ErrorHandler(error.message,401))
    }
})