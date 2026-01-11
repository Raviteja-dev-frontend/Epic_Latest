import React from "react";
import { Link } from "react-router-dom";
import "./wallDecoratives.css";

const WallDecorativesItem = ({ id, name, media, category, originalPrice, offerPrice }) => {
  const mainMedia = media || null;

  return (
    <Link
      to={{
        pathname: `/collections`,
        search: `?category=${encodeURIComponent(category || "")}`,
      }}
      className="text-decoration-none"
    >
      <div className="wall-premium-card">

        {/* IMAGE / VIDEO */}
        <div className="wall-media-box">
          {mainMedia ? (
            /\.(mp4|mov|webm)$/i.test(mainMedia) ? (
              <video
                src={mainMedia}
                className="wall-media-content"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={mainMedia}
                className="wall-media-content"
                alt={name}
              />
            )
          ) : (
            <div className="wall-no-media">
              No Media
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="wall-content-box">
          <p className="wall-product-title">{name}</p>

          <p className="wall-price">
            ₹{offerPrice}
            {originalPrice && (
              <span className="text-muted text-decoration-line-through ms-1 small">
                ₹{originalPrice}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default WallDecorativesItem;
