import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", verifyAdmin, addProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;