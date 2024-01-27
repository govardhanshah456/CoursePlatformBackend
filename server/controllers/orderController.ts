import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/order";
import userModel from "../models/user";
import courseModel from "../models/course";
import { newOrder } from "../services/order.service";
import path from "path";
import ejs from "ejs"
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification";
// import { newOrder } from "../services/order.service";

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;
        const user = await userModel.findById(req.user?._id);
        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId)
        if (courseExistInUser) {
            return next(new ErrorHandler("You have already purchased this course", 400))
        }
        const course = await courseModel.findById(courseId);
        if (!course)
            return next(new ErrorHandler("Course not found", 400))
        const data: any = {
            courseId: course._id,
            userId: user?._id,
            payment_info
        }
        const order = newOrder(data, res, next);
        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            },
            name: req.user?.name
        }
        const html = await ejs.renderFile(path.join(__dirname, '../mailTemplates/orderConfirmationTemplate'), { order: mailData, name: mailData.name })
        try {
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "orderConfirmation.ejs",
                    data: mailData
                })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }
        user?.courses.push({ courseId: course._id.toString() });
        await user?.save()
        await notificationModel.create({
            title: "New Order",
            message: `You have a new order from ${req.user?.name} who purchased course:${course?.name}`,
            user: user?.id,
        })
        if (course.purchased)
            course.purchased++;
        await course.save()
        res.status(200).json({
            success: true,
            order
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 404))
    }
})