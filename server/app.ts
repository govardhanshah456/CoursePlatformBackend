import express from "express";
import cors from 'cors';
import cookiepParser from 'cookie-parser';
import userRouter from "./routes/user";
import { ErrorHandlerMiddleware } from "./middleware/error";
import courseRouter from "./routes/course";
import notificationRouter from "./routes/notification";
import orderRouter from "./routes/order";
import analyticsRouter from "./routes/analytics";
export const app = express()
require('dotenv').config()
app.use(express.json({ limit: '50mb' }))
app.use(cookiepParser());
app.use('/api/v1', userRouter, courseRouter, notificationRouter, orderRouter, analyticsRouter)
app.use(cors({
    origin: process.env.ORIGIN
}))
app.use(ErrorHandlerMiddleware)