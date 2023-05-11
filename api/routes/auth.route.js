import express from "express";
import { register, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyToken, checkAuth)

export default router;