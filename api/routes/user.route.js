import express from "express";
import { deleteUser, getSellerInfo, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/:id", getSellerInfo);
router.delete("/:id", verifyToken, deleteUser);
router.get("/profile/:id", verifyToken, getUser);

// NEW
router.get("/", verifyToken, getUsers);
router.patch("/:id", verifyToken, updateUser);

export default router;