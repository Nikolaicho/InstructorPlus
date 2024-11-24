import express from "express";
import adminController from "../controllers/admin.controller";


const router = express.Router();

router.post("/makeTransaction",adminController.makeTransaction)
router.post("/signNewExam",adminController.signNewExam)
router.get("/getAllExams",adminController.getAllExams)
export default router;