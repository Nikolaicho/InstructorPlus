import express from "express";
import superAdminController from "../controllers/superAdmin.controller";

const router = express.Router();

router.post("/createCorporation",superAdminController.createCorporation)
router.post("/createInstructor",superAdminController.createInstructor)
export default router;