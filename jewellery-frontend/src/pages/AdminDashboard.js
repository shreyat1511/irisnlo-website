import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", form);
      setForm({ name: "", description: "", price: "", image: "" });
      fetchProducts(); // refresh list
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  //  EDIT PRODUCT
  const handleEdit = async (product) => {
    const newName = prompt("Enter new name:", product.name);
    const newPrice = prompt("Enter new price:", product.price);
    const newDescription = prompt("Enter new description:", product.description);
    if (!newName || !newPrice || !newDescription) return;

    try {
      const { data } = await axios.put(`http://localhost:5000/api/products/${product._id}`, {
        name: newName,
        price: newPrice,
        description: newDescription,
      });
      setProducts(products.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };

  //  DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  //  TOGGLE STATUS
  const handleToggle = async (product) => {
    const newStatus = product.status === "In Stock" ? "Sold Out" : "In Stock";
    try {
      const { data } = await axios.put(`http://localhost:5000/api/products/${product._id}`, {
        status: newStatus,
      });
      setProducts(products.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button
  onClick={() => (window.location.href = "/orders")}
  style={{
    backgroundColor: "#333",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px"
  }}
>
  View Orders
</button>



      {/* Add Product Form */}
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>

      <h3>All Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <img src={p.image} alt={p.name} width="80" /> <br />
            <strong>{p.name}</strong> - ₹{p.price} <br />
            {p.description} <br />
            <b>Status:</b> {p.status} <br />

            {/* Action Buttons */}
            <button onClick={() => handleEdit(p)}>✏️ Edit</button>
            <button onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
            <button onClick={() => handleToggle(p)}>🔁 Toggle Status</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
