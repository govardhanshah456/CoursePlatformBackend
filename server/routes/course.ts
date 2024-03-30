import express from "express"
import { activateUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from "../controllers/userController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
import { addQuestion, addReview, addReviewReply, answerQuestion, createCourse, deleteCourse, fileUpload, getAllCourses, getAllCoursesFull, getCourseById, getCourseByUser, updateCourse, videoUpload } from "../controllers/courseController"
import multer from "multer"
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/videos/') // Specify the destination directory for storing videos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Keep the original filename with a unique prefix
    }
});
const upload = multer({ storage });
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
courseRouter.get('/get-all-courses', isAuthenticated, authorizeRoles('admin'), getAllCoursesFull);
courseRouter.delete('/delete-course', isAuthenticated, authorizeRoles('admin'), deleteCourse);
courseRouter.post('/upload-video', upload.single('file'), videoUpload);
courseRouter.post('/upload-file', upload.single('file'), fileUpload);
export default courseRouter;