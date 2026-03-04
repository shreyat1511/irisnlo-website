import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  trackOrderByEmail,
} from "../controllers/orderController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyAdmin, getOrders);
router.get("/track", trackOrderByEmail); // Public — customer order tracking
router.get("/:id", verifyAdmin, getOrderById);
router.post("/", createOrder); // Public — customers place orders
router.put("/:id/status", verifyAdmin, updateOrderStatus);
router.delete("/:id", verifyAdmin, deleteOrder);

export default router;