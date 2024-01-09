import express from "express"
import { activateUser, loginUser, registerUser } from "../controllers/userController"
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/activate-user',activateUser)
userRouter.post('/login',loginUser)
export default userRouter;