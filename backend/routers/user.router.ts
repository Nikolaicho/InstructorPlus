import express from "express";
import adminController from "../controllers/admin.controller";

const router = express.Router();
//notifications
router.get("/getNotifications",adminController.getNotifications)

//user profile
router.post("/getUserInfo",adminController.getUserInfo)
export default router