import React, { useState } from "react";
import API from "../api";

const STATUS_STEPS = ["Received", "Packed", "Dispatched", "Delivered"];

const StatusBar = ({ currentStatus }) => {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);
  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      {STATUS_STEPS.map((step, index) => (
        <React.Fragment key={step}>
          <div className="text-center" style={{ flex: 1 }}>
            <div
              className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: index <= currentIndex ? "#212529" : "#dee2e6",
                color: index <= currentIndex ? "#fff" : "#6c757d",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              {index < currentIndex ? "✓" : index + 1}
            </div>
            <small className={`d-block mt-1 ${index <= currentIndex ? "fw-bold" : "text-muted"}`}>
              {step}
            </small>
          </div>
          {index < STATUS_STEPS.length - 1 && (
            <div
              style={{
                flex: 1,
                height: "3px",
                backgroundColor: index < currentIndex ? "#212529" : "#dee2e6",
                marginBottom: "20px",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

function Order() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");
    setOrders([]);

    try {
      const res = await API.get(`/orders/track?email=${encodeURIComponent(email)}`);
      setOrders(res.data);
      setSearched(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-2">Track Your Order</h2>
          <p className="text-center text-muted mb-4">
            Enter the email address you used when placing your order.
          </p>

          <form onSubmit={handleTrack} className="d-flex gap-2 mb-5">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-dark px-4" disabled={loading}>
              {loading ? "Searching..." : "Track"}
            </button>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}

          {searched && orders.length === 0 && !error && (
            <div className="alert alert-info text-center">
              No orders found for <strong>{email}</strong>. Double check your email and try again.
            </div>
          )}

          {orders.map((order) => (
            <div key={order._id} className="card shadow-sm mb-4 border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-0">{order.customerName}</h5>
                    <small className="text-muted">
                      Ordered on {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </small>
                  </div>
                  <span className="badge bg-dark">{order.status}</span>
                </div>

                <StatusBar currentStatus={order.status} />

                <hr />

                <h6 className="mb-2">Items</h6>
                {order.products.map((p, i) => (
                  <div key={i} className="d-flex justify-content-between text-muted small py-1 border-bottom">
                    <span>{p.name} × {p.quantity}</span>
                    <span>₹{p.price * p.quantity}</span>
                  </div>
                ))}

                <div className="d-flex justify-content-between fw-bold mt-3">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;