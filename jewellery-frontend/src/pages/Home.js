import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api";
import "./Home.css";

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get("/products");
        // Show first 3 available products as featured
        setFeatured(res.data.filter((p) => p.status === "available").slice(0, 3));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      <div className="top-banner text-center my-5">
        <h1 className="banner-title">Iris & Lo</h1>
        <p className="banner-subtitle">Elegant Jewellery for Every Occasion</p>
      </div>

      <h3 className="mb-3 text-center mt-5">Featured Products</h3>
      <div className="row g-4 justify-content-center">
        {featured.length > 0 ? (
          featured.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard
                id={p._id}
                image={p.image}
                title={p.name}
                price={p.price}
                description={p.description}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Loading featured products...</p>
        )}
      </div>

      <div className="footer-banner text-center mt-5">
        <p>© 2025 Iris & Lo | All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Home;