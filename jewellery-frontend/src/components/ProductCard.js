// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function ProductCard({ id, image, title, price, description }) {
  const { isLoggedIn } = useAuth();

  const handleAddToCart = () => {
  if (!isLoggedIn) {
    alert("Please sign up or log in to add items to the cart.");
    return;
  }

  // Always fetch the *latest* cart before modifying
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = {
    _id: id, // consistent unique ID
    title,
    price,
    image,
    quantity: 1,
  };

  const existingIndex = cart.findIndex((item) => item._id === product._id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(product);
  }

  // Save back
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${title} added to cart!`);
};



  return (
    <div className="card shadow-sm product-card">
      <img
        src={image || "https://via.placeholder.com/200"}
        className="card-img-top"
        alt={title}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="text-muted">{description}</p>
        <p className="card-text fw-bold">₹{price}</p>

        <div className="product-card-button">
          {isLoggedIn ? (
            <button className="btn btn-pink w-100" onClick={handleAddToCart}>
              Add to Cart 🛒
            </button>
          ) : (
            <Link
              to="/signup"
              className="btn btn-pink w-100"
              onClick={() =>
                alert("Please sign up or log in to add items to your cart.")
              }
            >
              Sign Up to Buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
