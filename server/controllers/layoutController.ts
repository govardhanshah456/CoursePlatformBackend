import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import layoutModel, { LayoutOptions } from "../models/layout";
import cloudinary from "cloudinary"
export const createLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body
        const isTypeExist = await layoutModel.findOne({ type })
        if (isTypeExist) {
            return next(new ErrorHandler(`${type} already exist.`, 400))
        }
        const normalizedType = type.toLowerCase()
        if (normalizedType === LayoutOptions.BANNER) {
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout"
            })
            const banner = {
                type: LayoutOptions.BANNER,
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            }
            await layoutModel.create(banner)
        }
        if (normalizedType === LayoutOptions.FAQ) {
            const { faq } = req.body
            const FaqItems = await Promise.all(faq.ma(async (item: any) => {
                return {
                    question: item.question,
                    answer: item.answer
                }
            }))
            await layoutModel.create({ faq: FaqItems, type: LayoutOptions.FAQ })
        }
        if (normalizedType === LayoutOptions.CATEGORIES) {
            const { categories } = req.body
            const FaqItems = await Promise.all(categories.ma(async (item: any) => {
                return {
                    title: item.title
                }
            }))
            await layoutModel.create({ categories: FaqItems, type: LayoutOptions.CATEGORIES })
        }
        res.status(201).json({
            success: true
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const editLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body
        const normalizedType = type.toLowerCase()
        if (normalizedType === LayoutOptions.BANNER) {
            const bannerData: any = await layoutModel.findOne({ type: LayoutOptions.BANNER })
            if (bannerData) {
                await cloudinary.v2.uploader.destroy(bannerData.image.public_id)
            }
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout"
            })
            const banner = {
                type: LayoutOptions.BANNER,
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            }
            await layoutModel.findByIdAndUpdate(bannerData?._id, { banner })
        }
        if (normalizedType === LayoutOptions.FAQ) {
            const { faq } = req.body
            const faqItems = await layoutModel.findOne({ type: LayoutOptions.FAQ })
            const FaqItems = await Promise.all(faq.map(async (item: any) => {
                return {
                    question: item.question,
                    answer: item.answer
                }
            }))
            await layoutModel.findByIdAndUpdate(faqItems?._id, { faq: FaqItems, type: LayoutOptions.FAQ })
        }
        if (normalizedType === LayoutOptions.CATEGORIES) {
            const { categories } = req.body
            const faqItems = await layoutModel.findOne({ type: LayoutOptions.CATEGORIES })
            const FaqItems = await Promise.all(categories.map(async (item: any) => {
                return {
                    title: item.title
                }
            }))
            await layoutModel.findByIdAndUpdate(faqItems?._id, { categories: FaqItems, type: LayoutOptions.CATEGORIES })
        }
        res.status(201).json({
            success: true
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})