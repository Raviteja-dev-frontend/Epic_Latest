import React, { useContext, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaInfoCircle, FaCheck } from 'react-icons/fa';
import './CollectionItem.css';

const CollectionItems = ({ id, media = [], name, price, description }) => {
  const { currency } = useContext(ShopContext);
  const [showDetails, setShowDetails] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const videoRef = useRef(null);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      navigate(`/product/${id}`);
    }, 3000);
  };

  // Detect media type by extension
  const getMediaType = (url) => {
    if (!url) return null;
    const videoExtensions = /\.(mp4|webm|ogg)$/i;
    return videoExtensions.test(url) ? 'video' : 'image';
  };

  const firstMediaObj = media.length > 0 ? media[0] : null;
  const firstMediaUrl = firstMediaObj?.url || 'fallback-image-url.jpg';
  const firstMediaType = getMediaType(firstMediaUrl);

  // Handle hover events to play/pause video
  const handleMouseEnter = () => {
    if (firstMediaType === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (firstMediaType === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className='collection-card-item'>
      <div className="collection-card-wrapper">
        <div className="collection-card-container">
          {/* Media Top */}
          <div 
            className="collection-card-top"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
              {firstMediaType === 'video' ? (
                <video
                  ref={videoRef}
                  src={firstMediaUrl}
                  muted
                  preload="metadata"
                  style={{ width: '100%', height: 'auto', borderRadius: '6px', cursor: 'pointer' }}
                  loop
                />
              ) : (
                <img src={firstMediaUrl} alt={name} />
              )}
            </Link>
          </div>

          {/* Bottom Sliding Section */}
          <div className={`collection-card-bottom ${added ? "clicked" : ""}`}>
            <div className="collection-card-left">
              <div className="collection-card-details">
                <p className='collection-card-name'>{name}</p>
                <p className='collection-card-price'>{currency} {price}</p>
              </div>

              {!added && (
                <div className="collection-card-buy" onClick={handleAddToCart}>
                  <FaShoppingCart />
                </div>
              )}
            </div>

            {added && (
              <div className="collection_Card_right">
                <div className="collection_Card_details">
                  <p>{name}</p>
                  <p>Added to your cart</p>
                </div>
                <div className="collection-card-done">
                  <FaCheck />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Toggle Section */}
        <div
          className="collection-card-overlay cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="collection-card-icon">
            <FaInfoCircle />
          </div>

          {/* Description Container with toggled class */}
          <div className={`collection-card-description ${showDetails ? 'show' : ''}`}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionItems;
