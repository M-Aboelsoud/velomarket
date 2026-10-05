import express from 'express';
import { createCategory, getAllCategories } from '../controllers/categoryController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router()

router.get('/', getAllCategories);

router.post("/", authenticateToken, isAdmin, createCategory);

export default router;