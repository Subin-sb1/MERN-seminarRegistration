import express from "express";
import { signUp, requestOtp, resetPassword, landingPage ,login ,registerSeminar,getUserRegistration, getFormData,  updateFormData, Status} from "../controllers/userController.js"; 
import{authenticateUser} from "../middleware/userAuthentication.js";
import { createOrder,verifyPayment } from "../controllers/paymentController.js";
import upload from "../middleware/multer.js";
const userRouter = express.Router(); 

userRouter.get("/", landingPage); 
userRouter.post("/request-otp", requestOtp);      
userRouter.post("/signup", signUp);              
userRouter.post("/reset-password", resetPassword); 
userRouter.post("/login", login);
userRouter.post("/register", upload.single('image'), registerSeminar);
userRouter.get("/getregistrations",getUserRegistration);
userRouter.get("/getformdata",getFormData)
userRouter.put("/update",upload.single('image'),updateFormData)
 

userRouter.post('/create-order',createOrder)
userRouter.post('/verify-payment',verifyPayment)
userRouter.get('/status',Status)
export default userRouter;
   