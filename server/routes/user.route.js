import express from "express";
import {
  login,
  register,
  logout,
  getSessions,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticate, logout);
router.get("/sessions", authenticate, getSessions);

export default router;
