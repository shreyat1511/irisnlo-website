import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products"); // same endpoint as Admin Dashboard
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Shop Jewellery</h2>
      <div className="row g-4">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard
                id={p._id}
                title={p.name}
                price={p.price}
                image={p.image}
                description={p.description}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No products available yet!</p>
        )}
      </div>
    </div>
  );
}

export default Shop;
