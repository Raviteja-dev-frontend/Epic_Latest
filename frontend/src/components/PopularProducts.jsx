import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import PopularProductsItem from "./PopularProductsItem";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "./popularProducts.css";

const PopularProducts = () => {
  const { popularProducts } = useContext(ShopContext);
  const [latestPopular, setLatestPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(popularProducts)) {
      setLatestPopular(popularProducts.slice(0, 10));
      setLoading(false);
    }
  }, [popularProducts]);

  const keywords = latestPopular.map(p => p.name).join(", ");

  return (
    <section className="container-fluid">
      <Helmet>
        <title>Popular Products - Epic Moments</title>
        <meta
          name="description"
          content="Explore our most loved and trending personalized gift products including photo frames, lamps, stands, and more."
        />
        <meta
          name="keywords"
          content={`popular products, trending items, best sellers, ${keywords}`}
        />
      </Helmet>

      <div className="Popular_main">
        <h2 className="text-center fw-bold mb-4">Popular Products</h2>

        {loading ? (
          <p className="text-center text-muted fs-5">Loading popular products...</p>
        ) : latestPopular.length === 0 ? (
          <p className="text-center text-muted fs-5">No popular products available.</p>
        ) : (
          <div className="row justify-content-center">
            {latestPopular.map(item => (
              <div
                key={item._id}
                className="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
              >
                <PopularProductsItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  category={item.category}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
