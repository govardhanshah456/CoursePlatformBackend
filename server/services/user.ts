import { Response } from "express";
import userModel from "../models/user"

export const getUserById = async (id: string, res: Response) => {
    const user = await userModel.findById(id);
    res.status(200).json({
        success: true,
        user
    })
}

export const getAllUsersService = async (res: Response) => {
    const user = await userModel.find();
    res.status(200).json({
        success: true,
        user
    })
}
