import express from "express";
import profileController from "../controllers/profile.controller";

const router = express.Router();

router.post("/makeTransaction",profileController.makeTransaction)
router.post("/deleteTransaction",profileController.deleteTransaction)
router.post("/signNewExam",profileController.signNewExam)
router.get("/getAllExams",profileController.getAllExams)
router.get("/getUserProfileInfo",profileController.getUserProfileInfo)

export default router;