import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  readCategory
} from "../controllers/category.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middlerware.js";
const app = express.Router();

app.route("/").post(authenticate, authorizeAdmin, createCategory);
app.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
app.route("/:categoryId").delete(authenticate, authorizeAdmin, deleteCategory);
app.route("/categories").get(listCategory);
app.route("/:id").get(readCategory);
export default app;
