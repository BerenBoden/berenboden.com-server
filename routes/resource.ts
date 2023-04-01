import express from "express";
import {
  deleteResource,
  getResource,
  postResource,
  updateResource,
} from "../controllers/resource.js";

const router = express.Router();

router.get("/", getResource);
router.post("/:id", postResource);
router.delete("/:id", deleteResource);
router.put("/:id", updateResource);

export default router;