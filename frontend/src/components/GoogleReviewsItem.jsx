import React from "react";
import "./GoogleReviews.css";

const GoogleReviewsItem = ({ name, review, rating, media }) => {
  const mainMedia = media || null;

  // Detect video formats correctly **even if Cloudinary URL doesn’t end with .mp4**
  const isVideo =
    mainMedia &&
    (mainMedia.includes("video/upload") ||
      /\.(mp4|mov|webm)$/i.test(mainMedia));

  return (
    <div className="google-review-card">
      {/* MEDIA SECTION */}
      <div className="google-media-box">
        {mainMedia ? (
          isVideo ? (
            <video
              src={mainMedia}
              className="google-media-content"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img src={mainMedia} className="google-media-content" alt={name} />
          )
        ) : (
          <div className="google-no-media">No Media</div>
        )}
      </div>

      {/* REVIEW TEXT SECTION */}
      <div className="google-content-box">
        <p className="google-reviewer-name">{name}</p>
        <p className="google-review-text">"{review}"</p>
        <p className="google-rating-stars">{"⭐".repeat(rating || 0)}</p>
      </div>
    </div>
  );
};

export default GoogleReviewsItem;
