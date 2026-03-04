import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Shop Jewellery</h2>
      {loading ? (
        <p className="text-center text-muted">Loading products...</p>
      ) : (
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
            <p className="text-center text-muted">No products available yet!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Shop;