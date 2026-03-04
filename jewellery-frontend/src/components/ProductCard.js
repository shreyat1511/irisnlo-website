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

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item._id === id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ _id: id, title, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
  };

  return (
    <div className="card shadow-sm product-card h-100">
      <img
        src={image || "https://via.placeholder.com/200"}
        className="card-img-top"
        alt={title}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="text-muted small">{description}</p>
        <p className="card-text fw-bold mt-auto">₹{price}</p>
        <div className="mt-2">
          {isLoggedIn ? (
            <button className="btn btn-pink w-100" onClick={handleAddToCart}>
              Add to Cart 🛒
            </button>
          ) : (
            <Link to="/signup" className="btn btn-pink w-100">
              Sign Up to Buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;