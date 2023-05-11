import express from "express";
import { deleteUser, getUser, getUsers, updateUser, blockUser, getOrders } from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// single user
router.get("/:id", verifyToken, getUser);
router.patch("/update/:id", verifyToken, updateUser);
router.patch("/block/:id", verifyToken, blockUser);
router.delete("/delete/:id", verifyToken, deleteUser);

// all users
router.get("/", verifyToken, getUsers);

// get all orders
router.get("/orders/get", verifyToken, getOrders);

export default router;