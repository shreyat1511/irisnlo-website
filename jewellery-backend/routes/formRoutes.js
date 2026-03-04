import express from "express";
import { submitForm, getForms } from "../controllers/formController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitForm);           // Public — anyone can submit
router.get("/", verifyAdmin, getForms); // Admin only — view all messages

export default router;