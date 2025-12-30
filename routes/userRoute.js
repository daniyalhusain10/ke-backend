import express from "express";
import { createUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";

const router = express.Router();

// Route: POST /api/users
router.post("/signup", createUser);
router.post("/login", loginUser)


export default router;
