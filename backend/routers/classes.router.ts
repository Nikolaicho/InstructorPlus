import express from "express";
import classesController from "../controllers/classes.controller" ;
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/getAllAvailableCandidates",authMiddleware.verifyUserCookie,classesController.getCandidates );
router.post("/signNewClass",authMiddleware.verifyUserCookie,classesController.signNewClass);
router.post("/getAllClasses",authMiddleware.verifyUserCookie,classesController.getAllClasses)
router.post("/searchCandidates",authMiddleware.verifyUserCookie,classesController.searchCandidates)
router.get("/getTimeLeft",authMiddleware.verifyUserCookie,classesController.timeLeft)

export default router;