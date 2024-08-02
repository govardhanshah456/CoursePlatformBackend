import cookieParser from "cookie-parser";
import { app } from "./app";
import connectDB from "./utils/db";
import cloudinary from "cloudinary";
import cron from 'node-cron';
import http from "http";
import { NextFunction } from "express";
import { updateAccessToken } from "./controllers/userController";
import { initSocketServer } from "./socketIoServer";
require("dotenv").config();
const server = http.createServer(app);
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})
initSocketServer(server)
app.use(cookieParser())
app.listen(process.env.PORT, () => {
    console.log(`Server STarted at PORT: ${process.env.PORT}`);
})

connectDB()
