import { NextFunction, Request, Response } from "express"
import { CatchAsyncError } from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/ErrorHandler"
import generateLast12MonthsData from "../utils/analytics-generator"
import userModel from "../models/user"
import courseModel from "../models/course"
import OrderModel from "../models/order"
// import userModel from "../models/user"

export const getUsersAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await generateLast12MonthsData(userModel)
        res.status(201).json({
            success: true,
            users
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

export const getCoursesAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await generateLast12MonthsData(courseModel)
        res.status(201).json({
            success: true,
            users
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})

export const getOrdersAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await generateLast12MonthsData(OrderModel)
        res.status(201).json({
            success: true,
            users
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }
})