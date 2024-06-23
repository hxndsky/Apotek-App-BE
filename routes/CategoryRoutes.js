import express from "express";
import {
  getCategory,
  postCategory,
  getProductByCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
  superAdminMiddleware,
} from "../middleware/UserMiddleware.js";

router.get("/", getCategory);
router.get("/:id", getProductByCategory);
router.post("/", authMiddleware, superAdminMiddleware, postCategory);
router.delete("/:id", authMiddleware, superAdminMiddleware, deleteCategory); // Add delete route
router.put("/:id", authMiddleware, superAdminMiddleware, updateCategory); // Add update route


export default router;
