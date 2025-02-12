import express from "express";
import { Accept, getUserTable, Reject, } from "../controllers/adminController.js";


const adminRouter = express.Router();

adminRouter.get('/usertable',getUserTable)
adminRouter.post('/accept',Accept)
adminRouter.post('/reject',Reject)


export default adminRouter;   