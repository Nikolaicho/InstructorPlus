import express from "express";
import notificationController from "../controllers/notification.controller";

const router = express.Router();
//notifications
router.get("/getNotifications",notificationController.getNotifications)

export default router

