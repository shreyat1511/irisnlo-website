import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // allows JSON body in requests
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);


// ✅ Step 3: Middleware for verifying admin token
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    jwt.verify(token, "SECRET_KEY");
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

// ✅ Temporary admin (you can store this in DB later)
const ADMIN = {
  email: "admin@irisnlo.com",
  password: bcrypt.hashSync("admin123", 8),
};

// ✅ Admin Login Route
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN.email)
    return res.status(400).json({ message: "Invalid email" });

  const isMatch = bcrypt.compareSync(password, ADMIN.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token });
});

// ✅ Protect product routes using verifyAdmin (you can later remove this for public access)
app.use("/api/products", productRoutes);

app.post("/api/products", verifyAdmin, async (req, res) => {
  // product creation logic
});

// ✅ NEW: Orders route
app.post("/api/orders", (req, res) => {
  const { items, totalAmount } = req.body;

  console.log("🛍️ Received new order:");
  console.log("Items:", items);
  console.log("Total Amount:", totalAmount);

  // You can later save this to MongoDB or SQLite, but for now just return success
  res.status(200).json({ message: "Order placed successfully!" });
});

app.delete("/api/products/:id", verifyAdmin, async (req, res) => {
  // product deletion logic
});


// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("IrisNlo Jewellery Backend is running ✨");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
