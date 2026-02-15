import express from "express";
import { getUser, loginUser, registerUser, logoutUser, getProfile, checkUser, adminUser, updateProfile } from "../controller/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser );

router.get("/user/:id", getUser );
router.post("/login",  loginUser );
router.post("/logout", logoutUser);
router.post("/ckeck", checkUser);
router.post("/admin", protect, adminUser);
router.get("/profile", protect, getProfile);
router.patch("/profile", protect, updateProfile);


export default router;