import express from "express";
import profileController from "../controllers/profile.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/makeTransaction",authMiddleware.verifyUserCookie,profileController.makeTransaction)
router.post("/deleteTransaction",authMiddleware.verifyUserCookie,profileController.deleteTransaction)
router.post("/signNewExam",authMiddleware.verifyUserCookie,profileController.signNewExam)
router.get("/getAllExams",authMiddleware.verifyUserCookie,profileController.getAllExams)
router.get("/getUserProfileInfo",authMiddleware.verifyUserCookie,profileController.getUserProfileInfo)
router.get("/getAllTransactions",authMiddleware.verifyUserCookie,profileController.getAllTransactions)
router.get("/getProfileId",authMiddleware.verifyUserCookie,profileController.getProfileId)
export default router;