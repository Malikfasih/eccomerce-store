import express from "express";
import { getOrders, getAllOrders, orderStatus } from "../controllers/order.js";
import { isAdmin, requireSignIn } from "../middleware/auth.js";

const router = express.Router();

//user get his/her orders only
router.get("/orders", requireSignIn, getOrders);

//all orders history for admin
router.get("/all-orders", requireSignIn, isAdmin, getAllOrders);

// order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatus);

export default router;
