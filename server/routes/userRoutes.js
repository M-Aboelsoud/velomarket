import {createUser, loginUser } from "../controllers/userController.js";
import express from "express";
import {authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", createUser);
router.post("/login", loginUser);

router.get("/profile", authenticateToken, (req, res) => {
    res.json({message: "This is a protected route", user: req.user});
});

export default router;