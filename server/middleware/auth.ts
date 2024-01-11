import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { redis } from "../utils/redis";
require('dotenv').config()
export const isAuthenticated = CatchAsyncError(async (req:Request,res:Response,next:NextFunction) => {
    try {
        const access_token = req.cookies.access_token
        if(!access_token)
            return next(new ErrorHandler('Please login to access this resource',500));
        const decoded = jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET as string ) as JwtPayload
        if(!decoded){
            return next(new ErrorHandler('access token is not valid',500));
        }
        const user = await redis.get(decoded.id);
        if(!user)
            return next(new ErrorHandler('user not found',400));
        req.user = JSON.parse(user);
        next()
    
    
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }

})
