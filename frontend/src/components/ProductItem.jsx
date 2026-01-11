import React, { useContext, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import './ProductItem.css';
import { FaShoppingCart, FaCheck, FaInfoCircle } from "react-icons/fa";

const ProductItem = ({ id, media = [], name, price, description }) => {
  const { currency } = useContext(ShopContext);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleCartClick = () => {
    setClicked(true);
    setTimeout(() => navigate(`/product/${id}`), 2000);
  };

  const firstMedia = media[0];

  const handleMouseEnter = () => videoRef.current?.play().catch(() => {});
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const renderMedia = () => {
    if (!firstMedia) return <img src="/default-image.png" alt="No media" />;

    switch (firstMedia.type) {
      case 'image': return <img src={firstMedia.url} alt={name} />;
      case 'video': return (
        <video ref={videoRef} muted preload="metadata" width="100%"
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <source src={firstMedia.url} type="video/mp4" />
        </video>
      );
      case 'audio': return (
        <audio controls preload="metadata" style={{ width: '100%' }}>
          <source src={firstMedia.url} type="audio/mpeg" />
        </audio>
      );
      default: return <img src={firstMedia.url} alt={name} />;
    }
  };

  return (
    <div className='product-item'>
      <div className="Product_Card_wrapper">
        <div className="Product_Card_top">
          <Link to={`/product/${id}`} onClick={() => window.scrollTo(0,0)}>
            {renderMedia()}
          </Link>
        </div>

        <div className="bottom">
  <div className="Product_Card_details">
    <p className='product-name'>{name}</p>
    <p className='product-price-1'>{currency}&nbsp;{price}</p>
  </div>
  {/* {!clicked && (
    <div className="Product_Card_buy" onClick={handleCartClick}>
      <FaShoppingCart />
    </div>
  )} */}
</div>


        {/* {clicked && (
          <div className="Product_Card_right">
            <h1>{name}</h1>
            <p>Added to your cart</p>
            <div className="Product_Card_done">
              <FaCheck />
            </div>
          </div>
        )} */}

        <div className="Product_Card_inside-1">
          <div className="Product_Card_icon">
            <FaInfoCircle />
          </div>
          <div className="Product_Card_Description">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
