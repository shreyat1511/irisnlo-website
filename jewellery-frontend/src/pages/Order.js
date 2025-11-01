import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet 💤</p>
      ) : (
        <ul>
          {orders.map((o) => (
            <li key={o._id}>
              <strong>{o.customerName}</strong> — ₹{o.totalAmount}
              <ul>
                {o.products.map((p, i) => (
                  <li key={i}>
                    {p.name} × {p.quantity} = ₹{p.price * p.quantity}
                  </li>
                ))}
              </ul>
              <select
                value={o.status}
                onChange={(e) => updateStatus(o._id, e.target.value)}
              >
                <option>Received</option>
                <option>Packed</option>
                <option>Dispatched</option>
                <option>Delivered</option>
              </select>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
