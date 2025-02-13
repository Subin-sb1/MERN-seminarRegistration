import express from "express";
import { Accept, adminLogin, getUserTable, Reject, } from "../controllers/adminController.js";


const adminRouter = express.Router();

adminRouter.get('/usertable',getUserTable)
adminRouter.post('/accept',Accept)
adminRouter.post('/reject',Reject)
adminRouter.post('/login',adminLogin)


export default adminRouter;   