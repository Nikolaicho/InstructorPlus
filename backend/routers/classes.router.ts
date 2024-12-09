import express from "express";
import classesController from "../controllers/classes.controller" ;

const router = express.Router();

router.get("/getAllAvailableCandidates",classesController.getCandidates );
router.post("/signNewClass",classesController.signNewClass);
router.post("/getAllClasses",classesController.getAllClasses)
router.post("/searchCandidates",classesController.searchCandidates)
router.get("/getTimeLeft",classesController.timeLeft)

export default router;