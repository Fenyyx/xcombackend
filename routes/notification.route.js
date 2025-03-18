import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controllers.js";

const router = express.Router();

router.get("/", getNotifications);
router.delete("/", deleteNotifications);

export default router;