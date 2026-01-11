import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CarDecorativesItem from "./CarDecorativesItem";
import { Helmet } from "react-helmet";
import "./carDecoratives.css";

const CarDecoratives = () => {
  const { carDecoratives } = useContext(ShopContext);
  const [latestCarDecor, setLatestCarDecor] = useState([]);

  useEffect(() => {
    if (Array.isArray(carDecoratives) && carDecoratives.length > 0) {
      setLatestCarDecor(carDecoratives.slice(0, 10));
    }
  }, [carDecoratives]);

  return (
    <section className="container-fluid">
      <Helmet>
        <title>Car Decoratives - Epic Moments</title>
        <meta
          name="description"
          content="Best Car Hanging Frames, Car Dashboard Gifts, Car Interior Décor items at Epic Moments."
        />
      </Helmet>
 <div className="car_main">
      <h2 className="text-center fw-bold mb-4">Car Decoratives</h2>
        {latestCarDecor.length === 0 ? (
        <p className="text-center text-muted fs-5">
          No car decoratives available.
        </p>
      ) : (
        <div className="row g-4 justify-content-center">
          {latestCarDecor.map((item) => (
            <div key={item._id} className="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center">
              <CarDecorativesItem
                id={item._id}
                name={item.name}
                media={item.media?.url}
                category={item.category}
                originalPrice={item.originalPrice}
                offerPrice={item.offerPrice}
              />
            </div>
          ))}
        </div>
      )}
</div>


    
    </section>
  );
};

export default CarDecoratives;

