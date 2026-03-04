import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const emptyForm = { name: "", description: "", price: "", image: "", status: "available" };

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
        setMessage("Product updated successfully!");
      } else {
        await API.post("/products", form);
        setMessage("Product added successfully!");
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      status: product.status,
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleToggleStatus = async (product) => {
    const newStatus = product.status === "available" ? "out of stock" : "available";
    try {
      const { data } = await API.put(`/products/${product._id}`, { status: newStatus });
      setProducts(products.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <Link to="/admin/orders" className="btn btn-dark">View Orders</Link>
      </div>

      {/* Add / Edit Product Form */}
      <div className="card p-4 shadow-sm mb-5">
        <h4>{editingId ? "Edit Product" : "Add New Product"}</h4>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Product Name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <input type="number" className="form-control" placeholder="Price (₹)"
                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="col-md-12">
              <input type="text" className="form-control" placeholder="Image URL"
                value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
            </div>
            <div className="col-md-12">
              <textarea className="form-control" placeholder="Description" rows="2"
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <select className="form-select" value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="available">Available</option>
                <option value="out of stock">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline-secondary"
                onClick={() => { setForm(emptyForm); setEditingId(null); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <h4 className="mb-3">All Products ({products.length})</h4>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card shadow-sm h-100">
              <img src={p.image} alt={p.name} className="card-img-top"
                style={{ height: "180px", objectFit: "contain" }} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="text-muted small">{p.description}</p>
                <p className="fw-bold">₹{p.price}</p>
                <span className={`badge ${p.status === "available" ? "bg-success" : "bg-danger"} mb-3`}>
                  {p.status}
                </span>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-dark" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p._id)}>Delete</button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleToggleStatus(p)}>
                    Toggle Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;