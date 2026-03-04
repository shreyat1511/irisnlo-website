import React, { useState, useEffect } from "react";

const SAMPLE_REVIEWS = [
  { id: 1, name: "Priya S.", rating: 5, comment: "Beautiful jewelry and fast shipping! Highly recommend the delicate necklace." },
  { id: 2, name: "Kiran J.", rating: 4, comment: "Love the unique design. One minor issue with packaging, but overall excellent quality." },
];

const StarRating = ({ rating }) => (
  <span style={{ color: "#ffc107", fontSize: "1.2em" }}>
    {"★".repeat(rating)}{"☆".repeat(5 - rating)}
  </span>
);

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews"));
    setReviews(stored || SAMPLE_REVIEWS);
  }, []);

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      alert("Please fill in your name and comment.");
      return;
    }
    const submitted = { ...newReview, id: Date.now(), rating: parseInt(newReview.rating) };
    const updated = [submitted, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-5">✨ Customer Reviews</h2>

      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="p-4 shadow-sm bg-light rounded">
            <h4 className="mb-3">Write a Review</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" name="name" className="form-control"
                  value={newReview.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select name="rating" className="form-select"
                  value={newReview.rating} onChange={handleChange}>
                  <option value="5">5 Stars — Excellent</option>
                  <option value="4">4 Stars — Very Good</option>
                  <option value="3">3 Stars — Good</option>
                  <option value="2">2 Stars — Fair</option>
                  <option value="1">1 Star — Poor</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea name="comment" className="form-control" rows="3"
                  value={newReview.comment} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100">Submit Review</button>
            </form>
          </div>
        </div>
      </div>

      <h4 className="text-center mb-4">What Our Buyers Say ({reviews.length})</h4>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {reviews.map((r) => (
            <div key={r.id} className="card shadow-sm mb-3 border-0">
              <div className="card-body">
                <h5 className="card-title mb-1">{r.name}</h5>
                <StarRating rating={r.rating} />
                <p className="card-text mt-2">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;