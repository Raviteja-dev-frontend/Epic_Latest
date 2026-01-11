import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const createToken = (id) =>
  jwt.sign({ id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ success: false, message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  const token = createToken(user._id);
  res.json({ success: true, token });
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.json({ success: false, message: "Invalid password" });

  const token = createToken(user._id);
  res.json({ success: true, token });
};
