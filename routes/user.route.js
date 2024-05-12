import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getallUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,updateUserById
} from "../controllers/user.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middlerware.js";

const app = express.Router();

app.route("/").post(createUser).get(authenticate, authorizeAdmin, getallUser);
app.post("/auth", loginUser);
app.post("/logout", logoutUser);

app
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// Admin routes 👇🏻
app
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default app;
