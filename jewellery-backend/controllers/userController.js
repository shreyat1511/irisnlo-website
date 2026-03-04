import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @desc  Admin login
// @route POST /api/users/login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Invalid email or not an admin." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
};

// @desc  Register admin (use once to seed your admin account)
// @route POST /api/users/register
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({ name, email, password, isAdmin: true });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed.", error: error.message });
  }
};