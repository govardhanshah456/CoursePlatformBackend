import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import userModel, { IUser } from "../models/user";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs"
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import bcrypt from "bcryptjs"
import { redis } from "../utils/redis";
import { getAllUsersService, getUserById } from "../services/user";
import cloudinary from "cloudinary";
require("dotenv").config()
interface IRegistrationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}
export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            throw new ErrorHandler('Please fill all required fields.', 403)
        const isEmailExist = await userModel.findOne({
            email
        })
        if (isEmailExist)
            return next(new ErrorHandler('Email Already Exists', 402));
        const user: IRegistrationBody = {
            name,
            email,
            password
        }
        const { token, activationCode } = getActivationCode(user);
        const data = {
            name: user.name,
            otp: activationCode
        }
        const html = await ejs.renderFile(path.join(__dirname, "../mailTemplates/activationTemplate.ejs"), data);
        try {
            await sendMail({
                email: user.email,
                subject: 'Activate Your Account',
                template: 'activationTemplate.ejs',
                data
            })
            res.status(201).json({
                success: true,
                message: 'Please check your inbox to activate your account.',
                activationToken: token
            })
        } catch (error) {

        }
    } catch (err: any) {
        console.log(err)
        return next(new ErrorHandler(err.mesaage, err.statusCode))
    }
})

const getActivationCode = (user: IRegistrationBody) => {
    const activationCode = generateOTP();
    const token = jwt.sign({
        user, activationCode
    }, process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "5m"
        })
    return { activationCode, token }
}

const generateOTP = () => {
    let digits =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10) % digits.length];
    }
    return OTP;
}

interface IActivationRequest {
    activationCode: string;
    token: string;
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activationCode, token } = req.body as IActivationRequest
        const newUser: { user: IUser; activationCode: string } = jwt.verify(
            token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: IUser; activationCode: string }
        if (newUser.activationCode != activationCode)
            return next(new ErrorHandler('Invalid OTP.', 500));
        const userExist = await userModel.findOne({
            email: newUser.user.email
        })
        if (userExist)
            return next(new ErrorHandler('User Already Exists.', 402));
        const user = await userModel.create({
            name: newUser.user.name,
            email: newUser.user.email,
            password: newUser.user.password
        })
        res.status(201).json({
            success: true,
            message: 'User registered Successfully.',
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})
interface ILoginRequest {
    email: string;
    password: string;
}
export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginRequest
        if (!email || !password) {
            return next(new ErrorHandler('Please fill all the fields.', 401));
        }
        console.log("Here")
        const userExist = await userModel.findOne({
            email
        }).select("+password")
        if (!userExist)
            return next(new ErrorHandler('No User with this email ID is registered.', 402));
        console.log(userExist)
        const ress = await bcrypt.hash(password, 10)
        console.log(ress)
        const passwordCompare = await userExist.comparePassword(password);
        console.log(passwordCompare)
        if (!passwordCompare)
            return next(new ErrorHandler('Incorrect Password.Please try again.', 500));
        console.log("Here2")
        sendToken(userExist, 201, res);
        console.log("Here3")
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 })
        res.cookie("refresh_token", "", { maxAge: 1 })
        const userId = req.user?.id
        redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logged out."
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let refresh_token = req.cookies.refresh_token as string
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload
        if (!decoded) {
            return next(new ErrorHandler('Could not refresh token', 500));
        }
        const session = await redis.get(decoded.id)
        if (!session)
            return next(new ErrorHandler('Could not refresh token', 500));
        const user = JSON.parse(session);
        const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: '5m'
        });
        if (!refresh_token) {
            refresh_token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET as string, {
                expiresIn: '5m'
            });
            res.cookie("refresh_token", refresh_token, refreshTokenOptions);
        }
        req.user = user
        res.cookie("access_token", access_token, accessTokenOptions);
        res.status(201).json({
            success: true,
            access_token
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        getUserById(userId, res)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

interface ISocialAuthBody {
    name: string;
    email: string;
    avatar: string;
}
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, avatar } = req.body as ISocialAuthBody;
        let user = await userModel.findOne({
            email
        })
        if (!user) {
            user = await userModel.create({
                name,
                email,
                avatar
            })
        }
        sendToken(user, 200, res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

interface IUpdateUserInfo {
    name?: string;
    email?: string;
}
export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name } = req.body as IUpdateUserInfo;
        if (!name && !email)
            return next(new ErrorHandler('You should fill at least one field to update it.', 401))
        const id = req.user?._id;
        const user = await userModel.findById(id);
        if (user && email) {
            const exist = await userModel.findOne({
                email
            })
            if (exist)
                return next(new ErrorHandler('Email Already Exists.', 401))
            user.email = email;
        }
        if (name && user)
            user.name = name;
        await user?.save();
        await redis.set(id, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
}
export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IUpdatePassword;
        if (!oldPassword || !newPassword)
            return next(new ErrorHandler('Fill old and new password fields.', 401))
        const user = await userModel.findById(req.user?._id);
        if (!user?.password)
            return next(new ErrorHandler('Given Account has logged in using google auth.', 401))
        const isPasswordMatch = await user?.comparePassword(oldPassword);
        if (!isPasswordMatch)
            return next(new ErrorHandler('Invalid CUrrent Passwor.', 401))
        user.password = newPassword
        await user?.save();
        res.status(200).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

interface IUpdateAvatar {
    avatar: string
}
export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body as IUpdateAvatar
        const user = await userModel.findById(req.user?._id);
        if (user && avatar) {
            if (user?.avatar?.public_id) {
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
            }
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150
            })
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }

        }
        await user?.save();
        await redis.set(req.user?._id, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

export const getAllUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllUsersService(res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

interface IUpdateUserRole {
    id: string,
    role: string
}
export const updateUserRole = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body as IUpdateUserRole
        const user = await userModel.findById(id)
        if (!user)
            return next(new ErrorHandler("No such user exists.", 401))
        user.role = role
        await user?.save();
        res.status(201).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

export const deleteUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        if (!user)
            return next(new ErrorHandler("No such user exists.", 401))
        await userModel.findByIdAndDelete(id)
        await redis.del(id)
        res.status(201).json({
            success: true,
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})