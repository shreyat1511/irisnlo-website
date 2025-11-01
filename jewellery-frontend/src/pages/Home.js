import React from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css"; // CSS

// IMPORT YOUR IMAGES
import DiamondRing from "../IMAGES/1758653505834.jpg";
import GoldNecklace from "../IMAGES/1758653505841.jpg";
import SilverBracelet from "../IMAGES/1758653505848.jpg";

function Home() {
  return (
    <div>
      {/* Existing Pink Banner - You can keep this */}
      <div className="top-banner text-center my-5">
        <h1 className="banner-title">Iris & Lo</h1>
        <p className="banner-subtitle">Elegant Jewellery for Every Occasion</p>
      </div>

      {/* Featured Products Section */}
      <h3 className="mb-3 text-center mt-5">Featured Products</h3>
      <div className="row g-4 justify-content-center">
        <div className="col-md-4">
          <ProductCard image={DiamondRing} title="nana inspired hachi neckpiece ~iris" price="349" />
        </div>
        <div className="col-md-4">
          <ProductCard image={GoldNecklace} title="faeveil princess necklace ~lo" price="450" />
        </div>
        <div className="col-md-4">
          <ProductCard image={SilverBracelet} title="vampire bite neckpiece(1) ~iris" price="450" />
        </div>
      </div>

      {/* Bottom Pink Banner - This replaces the black one */}
      <div className="footer-banner text-center mt-5">
        <p>© 2025 JewelStore | All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Home;