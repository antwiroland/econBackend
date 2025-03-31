import express from "express";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  deleteOrder,
  getAllOrders,
  toggleOrderstatus,
  getUserOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllOrders);
router.get("/:id", protectRoute, getUserOrder);
router.patch("/:id", protectRoute, adminRoute, toggleOrderstatus);
router.delete("/:id", protectRoute, deleteOrder);

export default router;
