 //src/pages/SignUp.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 🛑 UPDATED PATH: Import hook from the src directory
import { useAuth } from "../AuthContext";

// Define the source Pincode for shipping (Navi Mumbai, Maharashtra)
// This is used as the base for calculating local/regional delivery times.
const SOURCE_PINCODE = '400037';

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "", // New Field
        pincode: ""  // New Field
    });
   
    // New state for storing the delivery estimate message
    const [deliveryEstimate, setDeliveryEstimate] = useState("");

    const { login } = useAuth(); // Get the login function
    const navigate = useNavigate();

    // Logic to estimate delivery time based on Pincode proximity
    const calculateDeliveryEstimate = (destinationPincode) => {
        // Pincode 400xxx is for Mumbai Metropolitan Region (Local)
        const localPrefix = '400';
        // Pincode 4xxxx is for Maharashtra/Western India (Regional)
        const regionalPrefix = '4';

        let estimate = "";
       
        // Ensure destinationPincode is a string for substring operations
        const destPincodeStr = String(destinationPincode);
        const destPrefix = destPincodeStr.substring(0, 3);
        const destRegion = destPincodeStr.substring(0, 1);

        if (destPrefix === localPrefix) {
            estimate = "Estimated Delivery: 1-2 Business Days (Local)";
        } else if (destRegion === regionalPrefix) {
            estimate = "Estimated Delivery: 2-4 Business Days (Regional)";
        } else {
            estimate = "Estimated Delivery: 4-8 Business Days (National)";
        }

        setDeliveryEstimate(estimate);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // If the Pincode field is changing, update the delivery estimate
        if (name === 'pincode') {
            // Check if input is 6 digits and contains only numbers
            if (value.length === 6 && /^\d+$/.test(value)) {
                calculateDeliveryEstimate(value);
            } else if (value.length < 6) {
                setDeliveryEstimate(""); // Clear message if pincode is incomplete
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
       
        // Validate all required fields
        if (!formData.email || !formData.password || !formData.address || !formData.pincode) {
            alert("Please fill all required fields: Name, Email, Password, Address, and Pincode!");
            return;
        }

        // 🛑 KEY CHANGE: Call login() to set global status to true
        login();

        // In a real application, you would send all formData (including address) to the backend API here.
       
        alert(`Account created for ${formData.email}! You are now logged in! Your estimated delivery time is ${deliveryEstimate || '4-8 Business Days'}.`);
       
        // Reset form and state
        setFormData({ name: "", email: "", password: "", address: "", pincode: "" });
        setDeliveryEstimate("");
       
        // Redirect to Shop page
        navigate('/shop');
    };

    return (
        <div className="row justify-content-center py-5">
            <div className="col-md-6">
                <h2 className="text-center mb-4">Join Iris & Lo</h2>
                <form onSubmit={handleSubmit} className="p-4 shadow-lg bg-light rounded">
                   
                    {/* Full Name */}
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" name="name" className="form-control"
                            value={formData.name} onChange={handleChange} required />
                    </div>

                    {/* Email Address */}
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" className="form-control"
                            value={formData.email} onChange={handleChange} required />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control"
                            value={formData.password} onChange={handleChange} required />
                    </div>
                   
                    {/* New Address Fields */}
                    <div className="mb-3">
                        <label className="form-label">Shipping Address</label>
                        <textarea name="address" className="form-control" rows="3"
                            value={formData.address} onChange={handleChange} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Pincode</label>
                        <input type="text" name="pincode" className="form-control"
                            value={formData.pincode} onChange={handleChange}
                            maxLength="6" required />
                    </div>

                    {/* Delivery Estimate Display */}
                    {deliveryEstimate && (
                        <div className="alert alert-info py-2" role="alert">
                            {deliveryEstimate}
                        </div>
                    )}

                    <button type="submit" className="btn btn-dark w-100">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;