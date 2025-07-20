import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserprofile,
  updateUserProfile,
  getUserByID,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

import { getUsers } from "../controllers/userController.js";
router.route("/").get(protect, admin, getUsers).post(registerUser);

// Remove .get(getUsers) if getUsers is not defined
router.route("/").post(registerUser);

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserprofile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, getUserByID)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
