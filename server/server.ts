import cookieParser from "cookie-parser";
import { app } from "./app";
import connectDB from "./utils/db";
import cloudinary from "cloudinary";
import cron from 'node-cron';
import { NextFunction } from "express";
import { updateAccessToken } from "./controllers/userController";
require("dotenv").config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})
app.use(cookieParser())
app.listen(process.env.PORT, () => {
    console.log(`Server STarted at PORT: ${process.env.PORT}`);
})

connectDB()
