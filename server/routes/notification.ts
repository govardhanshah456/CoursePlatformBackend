import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
import { getNotifications, notificationStatus } from "../controllers/notificationController"
const notificationRouter = express.Router()
notificationRouter.get('/get-all-notifcations', isAuthenticated, authorizeRoles('admin'), getNotifications)
notificationRouter.put('/update-notification-status/:id', isAuthenticated, authorizeRoles('admin'), notificationStatus)
export default notificationRouter;