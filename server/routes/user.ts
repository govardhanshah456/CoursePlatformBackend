import express from "express"
import { activateUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from "../controllers/userController"
import { isAuthenticated } from "../middleware/auth"
const userRouter = express.Router()
userRouter.post('/register', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, logoutUser);
userRouter.get('/refresh-token', updateAccessToken)
userRouter.get('/me', isAuthenticated, getUserInfo);
userRouter.post('/socialauth', socialAuth);
userRouter.put('/update-user-info', updateUserInfo);
userRouter.put('/update-avatar', updateAvatar)
userRouter.put('/update-password', updatePassword)
export default userRouter;