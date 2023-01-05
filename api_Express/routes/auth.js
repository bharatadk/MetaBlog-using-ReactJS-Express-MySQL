import express from "express";
import { register, login, logout } from "../controllers/auth.js";
import { upload } from "../multerConfig.js";

const router = express.Router();

router.post("/register", upload.single("photo"), register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
