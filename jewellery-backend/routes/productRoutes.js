import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Public route
router.get("/", getProducts);

// Protected (admin only)
/*router.post("/", verifyAdmin, addProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);*/

router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;
