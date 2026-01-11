import React from "react";
import { Link } from "react-router-dom";
import "./offerProducts.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OfferProductsItem = ({ id, name, media, category, originalPrice, offerPrice }) => {
  const mainMedia = media || null;

  return (
    <Link
      to={{
        pathname: `/collections`,
        search: `?category=${encodeURIComponent(category || "")}`,
      }}
      className="text-decoration-none"
    >
      <div className=" offer-premium-card">
        
        {/* Media */}
        <div className="offer-media-box">
          {mainMedia ? (
            mainMedia.match(/\.(mp4|mov)$/i) ? (
              <video
                src={mainMedia}
                className="offer-media-content"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={mainMedia}
                alt={name}
                className="offer-media-content"
              />
            )
          ) : (
            <div className="offer-no-media">No Media</div>
          )}
        </div>

        {/* Text */}
        <div className="offer-content-box">
          <p className="offer-product-title">{name}</p>

          {/* {category && <p className="offer-product-category">{category}</p>} */}

          <p className="offer-price fw-bold mt-1">
            ₹{offerPrice}
            {originalPrice && (
              <span className="offer-original-price text-muted ms-1 text-decoration-line-through">
                ₹{originalPrice}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OfferProductsItem;
