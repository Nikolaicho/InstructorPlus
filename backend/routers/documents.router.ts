import express from "express";
import documentsController from "../controllers/documents.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
 
router.post("/createNewDocument",authMiddleware.verifyUserCookie,documentsController.createNewDocument);
router.get("/getAllDocuments",authMiddleware.verifyUserCookie,documentsController.getAllDocuments)
router.get("/getAllInstructors",authMiddleware.verifyUserCookie,documentsController.getAllInstructors)
router.post("/addCar",authMiddleware.verifyUserCookie,documentsController.addCar)
router.get("/getAllCars",authMiddleware.verifyUserCookie,documentsController.getAllCars)
router.post("/deleteDocument",authMiddleware.verifyUserCookie,documentsController.deleteDocuments)
router.post("/createInstructor",authMiddleware.verifyUserCookie,documentsController.createInstructor)

export default router;