import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./CommunityReviews.css";

interface Review {
  id: number;
  movie_id: number;
  username: string | null;
  review_text: string;
  rating: number;
  created_at: string;
  user_id: string | null;
}

interface CommunityReviewsProps {
  movieId: number;
}

const CommunityReviews: React.FC<CommunityReviewsProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // ------------------------------------------
  // 1️⃣ Fetch current logged-in user
  // ------------------------------------------
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        setUsername(user.user_metadata?.username ?? null);
      } else {
        setUserId(null);
        setUsername(null);
      }
    };

    getUser();
  }, []);

  // ------------------------------------------
  // 2️⃣ Load reviews for this movie
  // ------------------------------------------
  useEffect(() => {
    const loadReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReviews(data as Review[]);
      }
    };

    loadReviews();
  }, [movieId]);

  // ------------------------------------------
  // 3️⃣ Submit review
  // ------------------------------------------
  const submitReview = async () => {
    if (!userId) {
      alert("You must be logged in to submit a review.");
      return;
    }

    if (!username) {
      alert("Username missing! Please update profile.");
      return;
    }

    if (!text.trim() || rating === 0) return;

    const { error } = await supabase.from("reviews").insert({
      movie_id: movieId,
      user_id: userId, // ⭐ store user id
      username: username, // ⭐ store username
      review_text: text,
      rating,
    });

    if (!error) {
      setText("");
      setRating(0);

      // Refresh reviews
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

      if (data) setReviews(data as Review[]);
    } else {
      console.error("Review insert error:", error);
    }
  };

  return (
    <div className="reviews-container">
      <h3 className="reviews-title">Write a Review</h3>

      {/* If not logged in */}
      {!userId ? (
        <p className="login-warning">Please login to submit a review.</p>
      ) : (
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
      )}

      <h3 className="reviews-title">Community Reviews</h3>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-header">
                <span className="review-username">
                  {r.username ? r.username : "Anonymous User"}
                </span>
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
