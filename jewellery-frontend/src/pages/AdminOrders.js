import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Orders ({orders.length})</h2>
        <Link to="/admin" className="btn btn-outline-dark">← Back to Dashboard</Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet 💤</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Products</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.customerName}</td>
                  <td>{o.customerEmail}</td>
                  <td>
                    {o.products.map((p, i) => (
                      <div key={i} className="small">
                        {p.name} × {p.quantity} — ₹{p.price * p.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{o.totalAmount}</td>
                  <td className="small">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                  <td>
                    <select className="form-select form-select-sm"
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}>
                      <option>Received</option>
                      <option>Packed</option>
                      <option>Dispatched</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;