import express from "express";
import cors from 'cors';
import cookiepParser from 'cookie-parser';
import userRouter from "./routes/user";
import { ErrorHandlerMiddleware } from "./middleware/error";
import courseRouter from "./routes/course";
import notificationRouter from "./routes/notification";
import orderRouter from "./routes/order";
import analyticsRouter from "./routes/analytics";
import layoutRouter from "./routes/layout";
import { Queue } from "bullmq";
export const app = express()
export const emailQueue = new Queue("email-queue", {
    connection: {
        port: 6379,
        host: 'host.docker.internal'
    }
})
require('dotenv').config()
app.use(express.json({ limit: '50mb' }))
app.use(cookiepParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use('/api/v1', userRouter, courseRouter, notificationRouter, orderRouter, analyticsRouter, layoutRouter)
app.use(ErrorHandlerMiddleware)