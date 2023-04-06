import express from "express";
import { getAnalytics } from "../controllers/analytics.js";

const router = express.Router();

router.get("/test", getAnalytics);

export default router;
