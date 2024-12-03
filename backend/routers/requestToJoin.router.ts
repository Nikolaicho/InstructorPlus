import express from "express";
import requestToJoinController from "../controllers/requestToJoin.controller"

const router = express.Router();
router.get("/getAllCorporations",requestToJoinController.getAllCorporations)
router.post("/sendRequestToJoin",requestToJoinController.sendRequestToJoin)
router.get("/getAllRequests",requestToJoinController.getAllRequests)
router.post("/respondToRequest",requestToJoinController.respondToRequest)
export default router
