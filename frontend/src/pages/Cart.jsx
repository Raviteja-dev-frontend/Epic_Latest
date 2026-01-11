import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets.js';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Render thumbnail based on media type
  const renderThumbnail = (media, productName) => {
    if (!media) {
      return (
        <img
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
          src="/default.jpg"
          alt="Product"
        />
      );
    }

    switch (media.type) {
      case 'video':
        return (
          <video
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
            src={media.url}
            muted
            preload="metadata"
            controls={false}
            onClick={(e) => e.preventDefault()}
          />
        );
      case 'audio':
        return (
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
            src="/audio-icon.png" // Replace with your audio icon path or fallback image
            alt="Audio file"
          />
        );
      case 'image':
      default:
        return (
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
            src={media.url}
            alt={productName || 'Product'}
          />
        );
    }
  };

  return (
    <div className="container border-t pt-10 sm:pt-14 p-4 sm:p-6"  style={{ fontFamily: "ui-monospace" }}>
      {/* Title */}
      <div className="text-xl sm:text-2xl mb-6 sm:mb-10">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-gray-600 py-10">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            // Use first media or fallback image
            const firstMedia =
              productData.media && productData.media.length > 0
                ? productData.media[0]
                : { url: '/default.jpg', type: 'image' };

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_1fr_auto] items-center gap-4 sm:gap-6"
              >
                {/* Product Details */}
                <div className="flex items-start gap-4 sm:gap-6">
                  {renderThumbnail(firstMedia, productData.name)}
                  <div>
                    <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm sm:text-base">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 py-1 border bg-slate-50 rounded">{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || value === '0') return;
                    updateQuantity(item._id, item.size, Number(value));
                  }}
                  className="border rounded text-center w-12 sm:w-20 px-1 py-1 sm:py-1.5 text-sm"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />

                {/* Delete Button */}
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Delete"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Cart Total Section */}
      <div className="flex justify-end mt-14">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
           <button
  onClick={() => navigate('/place-order')}
  style={{
    backgroundColor: "#400c70",
    color: "white",
    padding: "0.75rem 4rem",
    fontSize: "0.875rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease-in-out, transform 0.2s ease"
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#f50202bf";
    e.target.style.transform = "translateY(-2px)";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#400c70";
    e.target.style.transform = "translateY(0)";
  }}
>
  PROCEED TO CHECKOUT
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
