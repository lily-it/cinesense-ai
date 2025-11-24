import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./CommunityReviews.css";

interface Review {
  id: number;
  username: string;
  review_text: string;
  rating: number;
  created_at: string;
}

interface CommunityReviewsProps {
  movieId: number;
}

const CommunityReviews: React.FC<CommunityReviewsProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  // ---------- FIXED: useEffect no longer calls setState synchronously ----------
  useEffect(() => {
    const loadReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReviews(data);
      }
    };

    loadReviews();
  }, [movieId]);

  // Submit a new review
  const submitReview = async () => {
    if (!text.trim() || rating === 0) return;

    const { error } = await supabase.from("reviews").insert({
      movie_id: movieId,
      username: "TestUser",
      review_text: text,
      rating,
    });

    if (!error) {
      setText("");
      setRating(0);

      // refresh the reviews after submission
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

      if (data) setReviews(data);
    }
  };

  return (
    <div className="reviews-container">
      <h3 className="reviews-title">Write a Review</h3>

      <div className="review-input-box">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
        />

        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "active" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button className="submit-review-btn" onClick={submitReview}>
          Submit Review
        </button>
      </div>

      <h3 className="reviews-title">Community Reviews</h3>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-header">
                <span className="review-username">{r.username}</span>
                <span className="review-rating">{"★".repeat(r.rating)}</span>
              </div>

              <p className="review-text">{r.review_text}</p>

              <span className="review-date">
                {new Date(r.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityReviews;
