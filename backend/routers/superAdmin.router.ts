import express from "express";
import superAdminController from "../controllers/superAdmin.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/createCorporation",authMiddleware.verifyUserCookie,superAdminController.createCorporation)
router.post("/createInstructor",authMiddleware.verifyUserCookie,superAdminController.createInstructor)
export default router;