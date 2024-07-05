import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/userController";
require('dotenv').config()
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;
        if (!access_token) { // Token expires in 5 minutes
            // Use the refresh token to obtain a new access token
            const newAccessToken = updateAccessToken(req, res, next);
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // Token expires in 7 days
            });

        }

        if (!refresh_token) {
            return next(new ErrorHandler('Please login to access this resource', 401));
        }

        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        if (!decoded) {
            return next(new ErrorHandler('access token is not valid', 401));
        }
        const currentTime = Date.now() / 1000;
        const tokenExpirationTime = decoded.exp as number;
        if (tokenExpirationTime - currentTime < 60 * 5) { // Token expires in 5 minutes
            // Use the refresh token to obtain a new access token
            const newAccessToken = updateAccessToken(req, res, next);
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // Token expires in 7 days
            });
        }



        const user = await redis.get(decoded.id);
        if (!user) {
            return next(new ErrorHandler('user not found', 404));
        }

        req.user = JSON.parse(user);
        next();

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return next(new ErrorHandler('access token has expired', 401));
        } else if (error.name === 'JsonWebTokenError') {
            return next(new ErrorHandler('invalid token', 401));
        } else {
            return next(new ErrorHandler(error.message, 500));
        }
    }
});

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(req.user?.role, roles)
        if (!roles.includes(req.user?.role))
            return next(new ErrorHandler('User is not allowed to access this resource', 402))
        next()
    }
}