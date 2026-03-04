import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SOURCE_PINCODE = "400037";

const getDeliveryEstimate = (pincode) => {
  const str = String(pincode);
  if (str.startsWith("400")) return "Estimated Delivery: 1-2 Business Days (Local)";
  if (str.startsWith("4")) return "Estimated Delivery: 2-4 Business Days (Regional)";
  return "Estimated Delivery: 4-8 Business Days (National)";
};

function SignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "", pincode: "" });
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "pincode") {
      if (value.length === 6 && /^\d+$/.test(value)) {
        setDeliveryEstimate(getDeliveryEstimate(value));
      } else {
        setDeliveryEstimate("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.pincode) {
      alert("Please fill in all fields!");
      return;
    }

    // Save user info and log in
    login({ name: formData.name, email: formData.email, address: formData.address, pincode: formData.pincode });
    alert(`Welcome to Iris & Lo, ${formData.name}! 🎀\n${deliveryEstimate || "Estimated Delivery: 4-8 Business Days"}`);
    navigate("/shop");
  };

  return (
    <div className="row justify-content-center py-5">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Join Iris & Lo</h2>
        <form onSubmit={handleSubmit} className="p-4 shadow-lg bg-light rounded">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control"
              value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control"
              value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control"
              value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Shipping Address</label>
            <textarea name="address" className="form-control" rows="3"
              value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input type="text" name="pincode" className="form-control"
              value={formData.pincode} onChange={handleChange} maxLength="6" required />
          </div>
          {deliveryEstimate && (
            <div className="alert alert-info py-2">{deliveryEstimate}</div>
          )}
          <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;