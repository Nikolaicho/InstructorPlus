import express from "express";
import adminController from "../controllers/admin.controller";

const router = express.Router();
 
router.post("/createNewDocument",adminController.createNewDocument);
router.get("/getAllDocuments",adminController.getAllDocuments)
router.get("/getAllInstructors",adminController.getAllInstructors)
router.post("/addCar",adminController.addCar)
router.get("/getAllCars",adminController.getAllCars)
router.post("/deleteDocument",adminController.deleteDocuments)

export default router;