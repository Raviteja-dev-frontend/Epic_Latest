import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets.js';
import RelatedProducts from '../components/RelatedProducts';
import './Product.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [description, setDescription] = useState('');
  const [reviews, setReviews] = useState([]);

  // Detect media type
  const detectMediaType = (url) => {
    if (!url) return 'image';
    const lower = url.toLowerCase();
    if (/\.(mp4|webm|ogg)$/i.test(lower)) return 'video';
    if (/\.(mp3|wav|ogg)$/i.test(lower)) return 'audio';
    return 'image';
  };

  useEffect(() => {
    const fetchProductData = async () => {
      const found = products.find(item => item._id === productId);

      const setMediaData = (product) => {
        let mediaArray = Array.isArray(product.media) && product.media.length > 0
          ? product.media
          : Array.isArray(product.image)
            ? product.image.map(url => ({ url, type: detectMediaType(url) }))
            : [{ url: assets.fallback_image, type: 'image' }];

        mediaArray = mediaArray.map(m =>
          typeof m === 'string'
            ? { url: m, type: detectMediaType(m) }
            : { ...m, type: m.type || detectMediaType(m.url) }
        );

        setProductData(product);
        setSelectedMedia(mediaArray[0]);
        setDescription(product.description || '');
        setReviews(product.reviews || []);
      };

      if (found) {
        setMediaData(found);
      } else {
        try {
          const res = await fetch(`/api/product/${productId}`);
          if (!res.ok) throw new Error('Network response was not ok');
          const data = await res.json();
          setMediaData(data);
        } catch (err) {
          console.error("Failed to fetch product:", err);
        }
      }
    };

    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div className='opacity-0'>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!size) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart(productData._id, size);
  };

  // Media Preview Renderer
  const renderPreviewMedia = () => {
    if (!selectedMedia) return null;

    switch (selectedMedia.type) {
      case 'video':
        return (
          <video
            src={selectedMedia.url}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-auto rounded"
          />
        );
      case 'audio':
        return (
          <audio
            src={selectedMedia.url}
            controls
            preload="auto"
            className="w-full rounded"
          />
        );
      default:
        return (
          <img
            src={selectedMedia.url}
            alt={productData.name}
            className="w-full h-auto rounded"
          />
        );
    }
  };

  return (
<div
  className="border-t-2 pt-0 sm:pt-10 transition-opacity ease-in duration-500 opacity-100"
  style={{ fontFamily: "ui-monospace" }}
>

      {/* Product Section */}
      <div className='flex gap-1 sm:gap-12 flex-col sm:flex-row'>
        {/* Media thumbnails */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {(productData.media && productData.media.length > 0
              ? productData.media
              : [{ url: assets.fallback_image, type: 'image' }]
            ).map((item, index) => {
              const isSelected = selectedMedia && selectedMedia.url === item.url;
              const borderStyle = isSelected ? '2px solid #c01502' : 'none';

              if (item.type === 'image') {
                return (
                  <img
                    key={index}
                    onClick={() => setSelectedMedia(item)}
                    src={item.url}
                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded'
                    alt={`product-media-${index}`}
                    style={{ border: borderStyle }}
                  />
                );
              }
              if (item.type === 'video') {
                return (
                  <video
                    key={index}
                    src={item.url}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded'
                    style={{ border: borderStyle }}
                    onClick={() => setSelectedMedia(item)}
                  />
                );
              }
              if (item.type === 'audio') {
                return (
                  <div
                    key={index}
                    className='audio-thumbnail w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer flex items-center justify-center bg-gray-100 text-gray-600 rounded'
                    style={{ border: borderStyle, height: '60px' }}
                    onClick={() => setSelectedMedia(item)}
                  >
                    🎵
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Main preview */}
          <div className='w-full sm:w-[80%]'>
            {renderPreviewMedia()}
          </div>
        </div>

        {/* Product Info */}
       <div className='flex-1'>
<h1 className="font-medium text-2xl pt-0 lg:pt-5 mt-0 sm:mt-2">{productData.name}</h1>

  <div className='flex items-center gap-1 mt-1 sm:mt-2 lg:pt-5'>
    {[1, 2, 3, 4, 5].map((star) => (
      <img
        key={star}
        src={productData.rating >= star ? assets.star_icon : assets.star_dull_icon}
        alt={`${star} star`}
        className="w-4 h-4"
      />
    ))}
    <p className='pl-2 text-sm text-gray-600'>
      {productData.rating?.toFixed(1)} / 5 ({productData.customers || reviews.length} reviews)
    </p>
  </div>

  <p className='mt-2 sm:mt-5 text-3xl font-medium lg:pt-5'>
    {currency}{productData.price}
  </p>

  {/* <p className='mt-0 sm:mt-5 text-gray-500 md:w-4/5'>
    {productData.shortDescription || ''}
  </p> */}

  <div className='flex flex-col gap-4 lg:pt-5 my-2'>
    <p>Select Size</p>
    <div className='flex gap-2'>
      {(productData.sizes ?? []).map((item, index) => (
        <button
          onClick={() => setSize(item)}
          className={`size-btn ${item === size ? 'active-size' : ''}`}
          key={index}
        >
          {item}
        </button>
      ))}
    </div>

    <button
      disabled={!size}
      onClick={handleAddToCart}
      className={`cart-button-1 ${!size ? 'opacity-50 cursor-not-allowed' : ''}`}
      type="button"
    >
      <span className="cart-icon-1">
        <svg
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle r="1" cy="21" cx="9"></circle>
          <circle r="1" cy="21" cx="20"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </span>
      Add to Cart
      <div className="progress-bar-1 "></div>
    </button>
  </div>

  <hr className='mt-5 lg:pt-5 sm:mt-8 sm:w-4/5' />

  <div className='mt-2 sm:mt-6 text-sm'>
    <h3 className='font-semibold text-red-600 mb-2'>Please Read Before Placing Your Order:</h3>
    <ul className='list-disc list-inside space-y-1'>
      <li>Ensure the correct size is selected before adding to cart.</li>
      <li>Customized items are non-returnable unless damaged.</li>
      <li>Delivery takes 5-7 working days across India.</li>
      <li>Provide an accurate shipping address and contact number.</li>
      <li>Contact support within 2 hours for order modifications.</li>
    </ul>
  </div>
</div>

      </div>

      {/* Tabs */}
      <div className="mt-1 lg:pt-5 lg:mt-5 sm:mt-20">

        <div className="flex lg:pt-5">
          <button
            onClick={() => setActiveTab('description')}
            className={`border px-5 py-3 text-sm font-bold ${activeTab === 'description' ? 'bg-gray-100' : ''}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'bg-gray-100' : ''}`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="border p-4 mt-2">
          {activeTab === 'description' && <p>{description}</p>}
          {activeTab === 'reviews' && (
            <div>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="border-b py-2 last:border-b-0">
                    <p className="font-semibold">{review.reviewer || 'Anonymous'}</p>
                    <p className="text-sm">{review.comment}</p>
                    <p className="text-xs text-gray-500">Rating: {review.rating}/5</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
     <div className="mt-1 sm:mt-20">
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      </div>

    </div>
  );
};

export default Product;
