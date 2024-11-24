import express from "express";
import adminController from "../controllers/admin.controller";

const router = express.Router();

router.post("/createCorporation",adminController.createCorporation)

export default router;