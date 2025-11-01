import React, { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  // ✅ Load cart when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ Fix: use the `cart` from state (not undefined)
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to place order");
    }

    alert("Order placed successfully!");
    setCart([]);
  } catch (err) {
    alert(`Failed to place order: ${err.message}`);
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛒 Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  width="50"
                  height="50"
                  style={{ objectFit: "contain" }}
                />
                <strong className="ms-2">{item.title}</strong> (x{item.quantity})
              </div>
              <div>
                ₹{item.price * item.quantity}
                <button
                  className="btn btn-sm btn-danger ms-3"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-center mt-4">
            <h4>
              Total: ₹
              {cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </h4>
            <button className="btn btn-success mt-3" onClick={handleCheckout}>
              Checkout 🛍️
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
