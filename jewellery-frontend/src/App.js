import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Reviews from "./pages/Reviews";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import Order from "./pages/Order";
import { AuthProvider, useAuth } from "./AuthContext";
import "./App.css";

// Protects admin routes — redirects to login if no token
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

function AppRoutes() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;