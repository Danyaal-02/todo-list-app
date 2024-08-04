import express from "express";
import {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", createTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;
