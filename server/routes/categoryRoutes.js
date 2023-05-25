import express from "express";
import { isAdmin, requireSignIn } from "../middleware/auth.js";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

//routes
// create category, is admin
router.post("/create-category", requireSignIn, isAdmin, createCategory);

//update category, is admin
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

//getAll category
router.get("/get-categories", getAllCategories);

//single category
router.get("/single-category/:slug", getSingleCategory);

//delete category, is admin
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
