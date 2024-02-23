import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
import { getNotifications, notificationStatus } from "../controllers/notificationController"
import { getCoursesAnalytics, getOrdersAnalytics, getUsersAnalytics } from "../controllers/analyticsController"
import { createLayout, editLayout } from "../controllers/layoutController"
const layoutRouter = express.Router()
layoutRouter.post('/create-layout', isAuthenticated, authorizeRoles('admin'), createLayout)
layoutRouter.put('/update-layout', isAuthenticated, authorizeRoles('admin'), editLayout)
export default layoutRouter;