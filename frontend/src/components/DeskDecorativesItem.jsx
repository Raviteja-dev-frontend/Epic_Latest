import React from "react";
import { Link } from "react-router-dom";
import "./deskDecoratives.css";

const DeskDecorativesItem = ({ id, name, media, category, originalPrice, offerPrice }) => {
  const mainMedia = media || null;

  return (
    <Link
      to={{
        pathname: `/collections`,
        search: `?category=${encodeURIComponent(category || "")}`,
      }}
      className="text-decoration-none"
    >
      <div className="desk-premium-card">

        {/* MEDIA AREA */}
        <div className="desk-media-box">
          {mainMedia ? (
            /\.(mp4|mov|webm)$/i.test(mainMedia) ? (
              <video
                src={mainMedia}
                className="desk-media-content"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={mainMedia}
                className="desk-media-content"
                alt={name}
              />
            )
          ) : (
            <div className="desk-no-media">No Media</div>
          )}
        </div>

        {/* PRODUCT DETAILS */}
        <div className="desk-content-box">
          <p className="desk-product-title">{name}</p>

        

          {/* PRICE */}
          <p className="desk-price">
            ₹{offerPrice}
            {originalPrice && (
              <span className="desk-original">
                ₹{originalPrice}
              </span>
            )}
          </p>
        </div>

      </div>
    </Link>
  );
};

export default DeskDecorativesItem;
