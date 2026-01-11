import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import OfferProductsItem from "./OfferProductsItem";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "./offerProducts.css";

const OfferProducts = () => {
  const { offerProducts } = useContext(ShopContext);
  const [latestOffers, setLatestOffers] = useState([]);

  useEffect(() => {
    if (Array.isArray(offerProducts) && offerProducts.length > 0) {
      setLatestOffers(offerProducts.slice(0, 10));
    }
  }, [offerProducts]);

  const keywords = latestOffers.map((p) => p.name).join(", ");

  return (
    <section className="Offer_Main container-fluid">
      <Helmet>
        <title>Offer Products - Epic Moments</title>
        <meta
          name="description"
          content="Grab the best deals on personalized gifts — photo frames, lamps, stands, and more at special offer prices."
        />
        <meta name="keywords" content={`offer products, discounts, deals, ${keywords}`} />
      </Helmet>
<div className="">
 <h2 className="text-center fw-bold mb-4">Combo Offers</h2>

      {latestOffers.length === 0 ? (
        <p className="text-center text-muted fs-5">No offer products available.</p>
      ) : (
        <div className="row justify-content-center">
          {latestOffers.map((item) => (
            <div
              key={item._id}
              className="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
            >
              <OfferProductsItem
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

export default OfferProducts;
