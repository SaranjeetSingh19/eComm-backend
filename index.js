import path from "path";
import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import uploadRoutes from "./routes/upload.route.js";
import orderRoutes from "./routes/order.route.js";

dotenv.config();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;


connectDb(mongoURI);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/demo", (req, res) => {
  res.status(200).send("Testing...")
})

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
