import express, { Router } from "express";
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
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

app.route("/my").get(authenticate, getUserOrders);
app.route("/total-orders").get(countTotalOrders);
app.route("/total-sales").get(calculateTotalSales);
app.route("/total-sales-by-date").get(calculateTotalSalesByDate);
app.route("/:id").get(authenticate, findOrderById);
app.route("/:id/pay").get(authenticate, markOrderAsPaid);
app
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);

  app.put('/mock-payment/:id', markOrderAsPaid);

export default app;
