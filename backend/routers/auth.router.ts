import express from "express";
import authController from "../controllers/auth.controller"

const router = express.Router();

router.post("/register", authController.handleRegister);
router.post("/logIn",authController.handleLogIn);
router.get("/isAdmin",authController.isAdmin)

export default router;