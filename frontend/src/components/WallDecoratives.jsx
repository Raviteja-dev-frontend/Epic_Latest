import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import WallDecorativesItem from "./WallDecorativesItem";
import { Helmet } from "react-helmet";
import "./wallDecoratives.css";

const WallDecoratives = () => {
  const { wallDecoratives } = useContext(ShopContext);
  const [latestWallDecor, setLatestWallDecor] = useState([]);

  useEffect(() => {
    if (Array.isArray(wallDecoratives) && wallDecoratives.length > 0) {
      setLatestWallDecor(wallDecoratives.slice(0, 10));
    }
  }, [wallDecoratives]);

  return (
    <section className="container-fluid py-4">

      <Helmet>
        <title>Wall Decoratives - Epic Moments</title>
        <meta
          name="description"
          content="Premium wall decoratives including acrylic wall frames, name boards, and wall gifts."
        />
      </Helmet>
<div className="wall_main">
 <h2 className="text-center fw-bold mb-4">Wall Decoratives</h2>

      {latestWallDecor.length === 0 ? (
        <p className="text-center text-muted fs-5">
          No wall decoratives available.
        </p>
      ) : (
        <div className="row justify-content-center">
          {latestWallDecor.map((item) => (
            <div key={item._id} className="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center">
              <WallDecorativesItem
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

export default WallDecoratives;
