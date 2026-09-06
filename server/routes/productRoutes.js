import express from "express";
import { createProduct, getAllProducts, updateProductStatus } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";



const router = express.Router();

router.post("/", authenticateToken, createProduct);
router.get("/", getAllProducts);

// Admin route to update product status
router.patch("/:id/status", authenticateToken, isAdmin, updateProductStatus);

export default router;