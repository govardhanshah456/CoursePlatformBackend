import express from "express"
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo, updateUserRole } from "../controllers/userController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
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
userRouter.get('/get-all-users', isAuthenticated, authorizeRoles('admin'), getAllUsers);
userRouter.put('/update-user-role', isAuthenticated, authorizeRoles('admin'), updateUserRole);
userRouter.delete('/delete-user', isAuthenticated, authorizeRoles('admin'), deleteUser);
export default userRouter;