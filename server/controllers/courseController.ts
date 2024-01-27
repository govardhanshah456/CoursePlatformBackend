import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary"
import { createCourseService, getAllCoursesService, getCourseByIdService, updateCourseService } from "../services/course";
import { redis } from "../utils/redis";
import courseModel from "../models/course";

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
        const isCached = await redis.get(req.params.id)
        if (isCached) {
            const course = JSON.parse(isCached);
            res.status(200).json({
                success: true,
                course
            })
        }
        else
            getCourseByIdService(req, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isCached = await redis.get("AllCoursesWithoutPurchase")
        if (isCached) {
            const course = JSON.parse(isCached);
            res.status(200).json({
                success: true,
                course
            })
        }
        else
            getAllCoursesService(req, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourses = req.user?.courses;
        const courseId = req.params.id;
        const courseExist = userCourses?.find((course: any) => course._id.toString() === courseId)
        if (!courseExist)
            return next(new ErrorHandler("You SHould Buy this course to access it fully.", 500));
        const course = await courseModel.findById(courseId);
        const content = course?.courseData
        res.status(200).json({
            success: true,
            content
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

interface IAddQuestionData {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId } = req.body as IAddQuestionData
        const course = await courseModel.findById(courseId);
        const content = course?.courseData.find((courseData: any) => courseData._id.equals(contentId))
        if (!content)
            return next(new ErrorHandler('Invalid Content ID.', 500))
        const newQuestion: any = {
            question,
            user: req.user,
            questionReplies: []
        }
        content.questions.push(newQuestion);
        await course?.save();
        res.status(200).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

interface IAnswerQuestionData {
    answer: string;
    questionId: string;
    courseId: string;
    contentId: string;
}

export const answerQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, questionId, courseId, contentId } = req.body as IAnswerQuestionData
        const course = await courseModel.findById(courseId);
        const content = course?.courseData.find((courseData: any) => courseData._id.equals(contentId))
        if (!content)
            return next(new ErrorHandler('Invalid Content ID.', 500))
        const newAnswer: any = {
            answer,
            user: req.user,
        }
        const question = content?.questions?.find((ques: any) => ques._id === questionId);
        question?.commentReplies?.push(newAnswer)
        await course?.save();
        res.status(200).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

interface IReviewData {
    courseId: string;
    review: string;
    rating: number;
}

export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, review, rating } = req.body as IReviewData
        const userCoursesList = req.user?.courses;
        const courseExist = userCoursesList?.some((course: any) => course._id.toString() === courseId.toString())
        if (!courseExist)
            return next(new ErrorHandler('Invalid Course ID.', 500))
        const course = await courseModel.findById(courseId);
        const newReview: any = {
            comment: review,
            user: req.user,
            rating
        }
        course?.reviews?.push(newReview)
        let avg = 0.0;
        course?.reviews.forEach((review: any) => avg += review.rating)
        if (course) {
            course.ratings = avg / course.reviews.length
        }
        await course?.save();
        const notification = {
            title: 'New Review Received',
            description: `${req.user?.name} has given a review in ${course?.name}`
        }
        res.status(200).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

interface IReviewReplyData {
    courseId: string;
    reviewId: string;
    comment: string;
}

export const addReviewReply = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, reviewId, comment } = req.body as IReviewReplyData
        const course = await courseModel.findById(courseId);
        if (!course)
            return next(new ErrorHandler('Invalid Course ID.', 500))
        const review = course?.reviews?.find((rev: any) => rev._id.toString() === reviewId)
        if (!review)
            return next(new ErrorHandler('Invalid Review ID.', 500))
        const newReview: any = {
            comment,
            user: req.user,
        }
        review.reviewReplies.push(newReview)
        await course?.save()
        res.status(200).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})