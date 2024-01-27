import express from "express"
import { activateUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from "../controllers/userController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
import { addQuestion, addReview, addReviewReply, answerQuestion, createCourse, getAllCourses, getCourseById, getCourseByUser, updateCourse } from "../controllers/courseController"
const courseRouter = express.Router()
courseRouter.post('/create-course', isAuthenticated, authorizeRoles('admin'), createCourse)
courseRouter.put('/update-course/:id', isAuthenticated, authorizeRoles('admin'), updateCourse)
courseRouter.get('/get-course/:id', getCourseById, logoutUser);
courseRouter.get('/get-all-courses', getAllCourses)
courseRouter.get('/get-course-content/:id', isAuthenticated, getCourseByUser);
courseRouter.put('/add-question', isAuthenticated, addQuestion);
courseRouter.put('/add-answer', isAuthenticated, answerQuestion);
courseRouter.put('/add-review/:id', isAuthenticated, addReview);
courseRouter.put('/add-review-reply/:id', isAuthenticated, authorizeRoles('admin'), addReviewReply);
export default courseRouter;