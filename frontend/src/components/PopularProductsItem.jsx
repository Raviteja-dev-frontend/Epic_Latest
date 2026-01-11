import React from "react";
import { Link } from "react-router-dom";
import "./popularProducts.css";

const PopularProductsItem = ({ id, name, image = [], category }) => {
  const mainMedia = image.length > 0 ? image[0] : null;

  return (
    <Link
      to={{
        pathname: `/collections`,
        search: `?category=${encodeURIComponent(category || "")}`,
      }}
      className="text-decoration-none"
    >
      <div className="popular-premium-card-1">

        {/* Media Box */}
        <div className="media-box">
          {mainMedia ? (
            /\.(mp4|mov)$/i.test(mainMedia) ? (
              <video
                src={mainMedia}
                className="media-content"
                autoPlay
                loop
                muted
              />
            ) : (
              <img src={mainMedia} className="media-content" alt={name} />
            )
          ) : (
            <div className="no-media">No Media</div>
          )}
        </div>

        {/* Content */}
        <div className="content-box">
          <p className="product-title">{name}</p>
          {/* {category && <p className="product-category">{category}</p>} */}
        </div>

      </div>
    </Link>
  );
};

export default PopularProductsItem;
