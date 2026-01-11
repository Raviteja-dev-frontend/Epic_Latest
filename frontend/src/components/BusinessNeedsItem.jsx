import React from "react";
import "./businessNeeds.css";
import { Link } from "react-router-dom";

const BusinessNeedsItem = ({ id, title, media, priority, category }) => {
  const mainMedia = media || null;

  return (
    <Link
      to={{
        pathname: "/collections",
        search: `?category=${encodeURIComponent(category || "")}`,
      }}
      className="text-decoration-none"
    >
      <div className="business-premium-card">

        <div className="business-media-box">
          {mainMedia ? (
            /\.(mp4|mov|webm)$/i.test(mainMedia) ? (
              <video
                src={mainMedia}
                className="business-media-content"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={mainMedia}
                className="business-media-content"
                alt={title}
              />
            )
          ) : (
            <div className="business-no-media">No Media</div>
          )}
        </div>

        <div className="business-content-box">
          <p className="business-product-title">{title}</p>
          <p className="text-danger fw-bold small mb-0">
            Starting at ₹{priority}
          </p>
        </div>

      </div>
    </Link>
  );
};

export default BusinessNeedsItem;
