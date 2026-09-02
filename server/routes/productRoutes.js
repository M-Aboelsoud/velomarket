import express from "express";
import { createProduct, getAllProducts } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/", authenticateToken, createProduct);
router.get("/", getAllProducts);

export default router;