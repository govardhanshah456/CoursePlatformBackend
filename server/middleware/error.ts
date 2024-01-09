import { NextFunction,Request,Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
export const ErrorHandlerMiddleware = (err:any,req:Request,res:Response,next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    console.error(err)
    err.message = err.message || 'Internal Server Error';
    let message = '';
    if(err.name === 'CastError'){
        message = `Resource Not FOund. Invalid : ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    if(err.code === 11000){
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }
    if(err.name === 'JsonWebTokenError'){
        message = `Json Web Token is invalid, please try again`;
        err = new ErrorHandler(message,400);
    }
    if(err.name === 'TokenExpiredError'){
        message = `Json Web Token has expired, please try again`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}