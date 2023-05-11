import express from "express";
import { verifyToken } from "../middleware/jwt.js"
import { getOrders, intent, confirm, deliverOrder, acceptDelivery, getOrder } from "../controllers/order.controller.js"

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.patch("/", verifyToken, confirm);

// NEW
router.patch("/:id/deliver", verifyToken, deliverOrder);
router.patch("/:id/accept", verifyToken, acceptDelivery);
router.get("/:id/info", verifyToken, getOrder);


export default router;