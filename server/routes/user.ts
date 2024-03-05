import express from "express"
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo, updateUserRole, updateUserSubscription } from "../controllers/userController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
const userRouter = express.Router()
userRouter.post('/register', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, logoutUser);
userRouter.get('/refresh', updateAccessToken)
userRouter.get('/me', isAuthenticated, getUserInfo);
userRouter.post('/socialauth', socialAuth);
userRouter.put('/update-user-info', isAuthenticated, updateUserInfo);
userRouter.put('/update-avatar', isAuthenticated, updateAvatar)
userRouter.put('/update-password', updatePassword)
userRouter.get('/get-all-users', isAuthenticated, authorizeRoles('admin'), getAllUsers);
userRouter.put('/update-user-role', isAuthenticated, authorizeRoles('admin'), updateUserRole);
userRouter.put('/update-user-subscription', isAuthenticated, authorizeRoles('admin'), updateUserSubscription);
userRouter.delete('/delete-user', isAuthenticated, authorizeRoles('admin'), deleteUser);
export default userRouter;