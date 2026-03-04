import React, { useState } from "react";
import API from "../api";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      await API.post("/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 shadow-sm bg-light rounded">
      {status === "success" && (
        <div className="alert alert-success">Message sent! We'll get back to you soon 💌</div>
      )}
      {status === "error" && (
        <div className="alert alert-danger">Something went wrong. Please try again.</div>
      )}

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" className="form-control"
          value={formData.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control"
          value={formData.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea name="message" className="form-control" rows="4"
          value={formData.message} onChange={handleChange} required></textarea>
      </div>
      <button type="submit" className="btn btn-dark w-100" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default ContactForm;