import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "./asynchandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from 'JWT' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Cheking for admin validation
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorize for admin");
  }
};

export { authenticate, authorizeAdmin };
