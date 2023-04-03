import express from "express";
import { postLogin, postRegister } from "../controllers/auth.js";
import validation from "../validation/auth.js";

const router = express.Router();

router.get("/");
// router.get("/refresh-token", refreshToken);
router.post("/register", validation.postRegister, postRegister);
router.post("/login", validation.postLogin, postLogin);

export default router;
