import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields!");
      return;
    }
    alert("Thank you! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 shadow-sm bg-light rounded">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" className="form-control"
          value={formData.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control"
          value={formData.email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea name="message" className="form-control" rows="4"
          value={formData.message} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-dark w-100">Send</button>
    </form>
  );
}

export default ContactForm;
