import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand brand-name" to="/">Iris & Lo</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">Shop</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reviews">Reviews</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/orders">Track Order</NavLink>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin</NavLink>
              </li>
            )}

            {isLoggedIn ? (
              <li className="nav-item ms-lg-2">
                <button className="btn btn-sm btn-outline-light px-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item ms-lg-3">
                <NavLink className="nav-link btn btn-sm btn-outline-light px-3" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            )}

            <li className="nav-item ms-lg-2">
              <NavLink className="nav-link" to="/cart">🛒 Cart</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;