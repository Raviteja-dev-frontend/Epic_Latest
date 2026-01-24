import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("👉 ADMIN LOGIN HIT");
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      console.log("❌ ENV MISMATCH");
      console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    let admin = await User.findOne({ email });

    if (!admin) {
      console.log("🆕 Creating admin in DB");
      admin = await User.create({
        email,
        password: "admin",
        isAdmin: true,
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ ADMIN LOGIN SUCCESS");

    return res.json({
      success: true,
      token,
      message: "Admin login successful",
    });

  } catch (err) {
    console.error("🔥 ADMIN LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
