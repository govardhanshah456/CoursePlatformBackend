import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary"
import { createCourseService, getAllCoursesService, getCourseByIdService, updateCourseService } from "../services/course";

export const createCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            })
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        createCourseService(data, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const updateCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            })
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        updateCourseService(req, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const getCourseById = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getCourseByIdService(req, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllCoursesService(req, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})
