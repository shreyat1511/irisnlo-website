import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import API from "../api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    // Pre-fill from logged in user if available
    if (user) {
      setCustomerInfo({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      alert("Please fill in your name and email.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/orders", {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        products: cart.map((item) => ({
          name: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
      });

      alert("Order placed successfully! 🎉 Check your email for confirmation.");
      setCart([]);
      localStorage.removeItem("cart");
      setShowCheckoutForm(false);
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id}
              className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <div className="d-flex align-items-center gap-3">
                <img src={item.image} alt={item.title} width="60" height="60"
                  style={{ objectFit: "contain" }} />
                <div>
                  <strong>{item.title}</strong>
                  <div className="text-muted small">Qty: {item.quantity}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span>₹{item.price * item.quantity}</span>
                <button className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRemove(item._id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h4>Total: ₹{total}</h4>
            <button className="btn btn-dark mt-2"
              onClick={() => setShowCheckoutForm(!showCheckoutForm)}>
              {showCheckoutForm ? "Cancel" : "Proceed to Checkout"}
            </button>
          </div>

          {showCheckoutForm && (
            <form onSubmit={handleCheckout} className="mt-4 p-4 bg-light rounded shadow-sm col-md-6 mx-auto">
              <h5 className="mb-3">Delivery Details</h5>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  required />
              </div>
              <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                {loading ? "Placing Order..." : "Place Order 🛍️"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;