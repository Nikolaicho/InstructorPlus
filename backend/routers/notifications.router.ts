import express from "express";
import notificationController from "../controllers/notification.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
//notifications
router.get("/getNotifications",authMiddleware.verifyUserCookie,notificationController.getNotifications)

export default router

