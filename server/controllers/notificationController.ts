import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import notificationModel, { statusVals } from "../models/notification";
import cron from "node-cron"
export const getNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await notificationModel.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            notifications
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const notificationStatus = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await notificationModel.findById(req.params.id);
        if (!notifications)
            return next(new ErrorHandler("Notification not found.", 500))
        if (notifications?.status)
            notifications.status = statusVals.READ
        await notifications?.save()
        const allNotifications = await notificationModel.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            allNotifications
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

cron.schedule("Delete 30 days Notifications", async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    await notificationModel.deleteMany({
        status: statusVals.READ,
        createdAt: {
            $lt: thirtyDaysAgo
        }
    })
})