import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import "bootstrap/dist/css/bootstrap.min.css";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);

  // Debounced resize handler
  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!products || products.length === 0) {
      setLatestProducts([]);
      setLoading(true);
      return;
    }

    setLoading(false);

    let count = 12;
    if (screenWidth >= 800 && screenWidth <= 1270) count = 9;
    else if (screenWidth < 800) count = 6;

    setLatestProducts(products.slice(0, count));
  }, [products, screenWidth]);

  if (loading) {
    return (
      <div className="my-5 text-center">
        <p>Loading latest collections...</p>
      </div>
    );
  }

  if (latestProducts.length === 0) {
    return (
      <div className="my-5 text-center">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="Latest_main-1">
      <div className="text-center mb-4">
        <h1 className="display-5">Latest Collections</h1>
        <p className="text-muted">
          Explore personalized gifts made to celebrate your special moments from photo frames to custom mugs.
        </p>
      </div>

      <div className="container latest-collection-container">
        <div className="row justify-content-center">
          {latestProducts.map((item, index) => (
            <div
              key={item._id ?? index}
              className="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center mb-4"
            >
              <ProductItem
                id={item._id}
                media={item.media ?? []}
                name={item.name ?? 'Unnamed Product'}
                price={item.price ?? 'N/A'}
                description={item.description ?? ''}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
