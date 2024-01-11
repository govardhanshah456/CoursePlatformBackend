import express from "express";
import cors from 'cors';
import cookiepParser from 'cookie-parser';
import userRouter from "./routes/user";
import { ErrorHandlerMiddleware } from "./middleware/error";
export const app = express()
require('dotenv').config()
app.use(express.json({ limit: '50mb' }))
app.use(cookiepParser());
app.use('/api/v1', userRouter)
app.use(cors({
    origin: process.env.ORIGIN
}))
app.use(ErrorHandlerMiddleware)