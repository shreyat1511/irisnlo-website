import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Use once to create your admin account, then disable

export default router;