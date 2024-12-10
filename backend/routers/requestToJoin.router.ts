import express from "express";
import requestToJoinController from "../controllers/requestToJoin.controller"
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
router.get("/getAllCorporations",authMiddleware.verifyUserCookie,requestToJoinController.getAllCorporations)
router.post("/sendRequestToJoin",authMiddleware.verifyUserCookie,requestToJoinController.sendRequestToJoin)
router.get("/getAllRequests",authMiddleware.verifyUserCookie,requestToJoinController.getAllRequests)
router.post("/respondToRequest",authMiddleware.verifyUserCookie,requestToJoinController.respondToRequest)
export default router
