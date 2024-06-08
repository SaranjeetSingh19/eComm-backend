import express from "express";
import formidable from "express-formidable";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchAllProducts,
  getProductById,
  fetchProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/product.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middlerware.js";
import checkId from "../middlewares/checkId.middleware.js";

const app = express.Router();

app
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

app.route("/allproducts").get(fetchAllProducts);
app.route("/:id/reviews").post(authenticate, checkId, addProductReview);
app.get("/top", fetchTopProducts);
app.get("/new", fetchNewProducts);

app
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

app.route("/filtered-products").post(filterProducts);

export default app;
