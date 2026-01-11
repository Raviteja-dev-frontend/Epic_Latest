import React from "react";
import { Link } from "react-router-dom";
import "./carDecoratives.css";

const CarDecorativesItem = ({
  id,
  name,
  media,
  category,
  originalPrice,
  offerPrice,
}) => {
  const mainMedia = media || null;

  return (
    <Link
      to={{
        pathname: `/collections`,
        search: `?category=${encodeURIComponent(category || "")}`,
      }}
      className="text-decoration-none"
    >
      <div className="car-premium-card">
        <div className="car-media-box">
          {mainMedia ? (
            /\.(mp4|mov|webm)$/i.test(mainMedia) ? (
              <video
                src={mainMedia}
                className="car-media-content"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={mainMedia}
                className="car-media-content"
                alt={name}
              />
            )
          ) : (
            <div className="car-no-media">
              No Media
            </div>
          )}
        </div>

        <div className="car-content-box">
          <p className="car-product-title">{name}</p>

          <p className="car-price">
            ₹{offerPrice}
            {originalPrice && (
              <span className="car-original">
                ₹{originalPrice}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CarDecorativesItem;
