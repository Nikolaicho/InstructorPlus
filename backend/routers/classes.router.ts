import express from "express";
import adminController from "../controllers/admin.controller";

const router = express.Router();

router.get("/getAllAvailableCandidates",adminController.getCandidates );
router.post("/signNewClass",adminController.signNewClass);
router.post("/getAllClasses",adminController.getAllClasses)
router.post("/searchCandidates",adminController.searchCandidates)
export default router;