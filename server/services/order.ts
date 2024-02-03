import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order";

export const newOrder = CatchAsyncError(async (data: any, next: NextFunction) => {
    const order = await OrderModel.create(data)
    // next(order)
    return order
})

export const getAllOrdersService = async (res: Response) => {
    const order = await OrderModel.find()
    res.status(201).json({
        success: true,
        order
    })
}