import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import courseModel from "../models/course";
import { redis } from "../utils/redis";

export const createCourseService = CatchAsyncError(async (data: any, res: Response) => {
    try {
        const course = await courseModel.create(data.data);
        res.status(201).json({
            success: true,
            course
        })
    } catch (error) {
        console.log(error)
        return;
    }

})

export const updateCourseService = CatchAsyncError(async (req: any, res: any, next: NextFunction) => {
    const data = req.body;
    const courseId = req.params.id
    console.log(data)
    const course = await courseModel.findByIdAndUpdate(courseId, {
        $set: data
    }, {
        new: true
    });
    res.status(201).json({
        success: true,
        course
    });
})

export const getCourseByIdService = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const course = await courseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.attachmentAndNotesLinks");
    await redis.set(req.params.id, JSON.stringify(course));
    res.status(200).json({
        success: true,
        course
    })
})

export const getAllCoursesService = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const course = await courseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.attachmentAndNotesLinks");
    await redis.set("AllCoursesWithoutPurchase", JSON.stringify(course));
    res.status(200).json({
        success: true,
        course
    })
})

export const getAllCoursesServiceFull = async (res: Response) => {
    const user = await courseModel.find();
    res.status(200).json({
        success: true,
        course: user
    })
}