import express from "express";
import { createProduct, getAllProducts, updateProductStatus } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Define fields and max count for file uploads
const mediaUpload = upload.fields([
    { name: 'image', maxCount: 10},
    { name: 'video', maxCount: 1}
]);


router.patch("/:id/status", authenticateToken, isAdmin, updateProductStatus);
router.post("/", authenticateToken, mediaUpload, createProduct);
router.get("/", getAllProducts);

export default router;