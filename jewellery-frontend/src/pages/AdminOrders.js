import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders");
    setOrders(res.data);
  };

  const updateStatus = async (id, newStatus) => {
    await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus });
    fetchOrders();
  };

  return (
    <div>
      <h2>📦 Orders</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.customerName}</td>
              <td>
                {o.products.map((p, i) => (
                  <div key={i}>
                    {p.name} × {p.quantity} (₹{p.price})
                  </div>
                ))}
              </td>
              <td>₹{o.totalAmount}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                >
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
  );
}

export default AdminOrders;
