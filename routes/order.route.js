import express from "express";
const app = express.Router();

import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middlerware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/order.controller.js";

app
  .route("/")
  .get(authorizeAdmin, getAllOrders)
  .post(createOrder);

app.route("/my").get(getUserOrders);
app.route("/total-orders").get(countTotalOrders);
app.route("/total-sales").get(calculateTotalSales);
app.route("/total-sales-by-date").get(calculateTotalSalesByDate);
app.route("/:id").get( findOrderById);
app.route("/:id/pay").get(markOrderAsPaid);
app
  .route("/:id/deliver")
  .put(authorizeAdmin, markOrderAsDelivered);

app.put("/mock-payment/:id", markOrderAsPaid);

export default app;
