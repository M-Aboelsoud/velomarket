import express from "express";
import { createProduct } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", authenticateToken, createProduct);

export default router;