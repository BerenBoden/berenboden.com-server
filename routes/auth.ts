import express from "express";
import { postLogin, postRegister } from "../controllers/auth.js";
import validation from "../validation/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/");
// router.get("/refresh-token", refreshToken);
router.post(
  "/register",
  validation.postRegister,
  validateRequest,
  postRegister
);
router.post("/login", validation.postLogin, validateRequest, postLogin);

export default router;
