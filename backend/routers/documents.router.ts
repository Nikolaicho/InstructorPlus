import express from "express";
import documentsController from "../controllers/documents.controller";

const router = express.Router();
 
router.post("/createNewDocument",documentsController.createNewDocument);
router.get("/getAllDocuments",documentsController.getAllDocuments)
router.get("/getAllInstructors",documentsController.getAllInstructors)
router.post("/addCar",documentsController.addCar)
router.get("/getAllCars",documentsController.getAllCars)
router.post("/deleteDocument",documentsController.deleteDocuments)

export default router;