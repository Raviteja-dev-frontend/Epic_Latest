import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import BusinessNeedsItem from "./BusinessNeedsItem";
import { Helmet } from "react-helmet";
import "./businessNeeds.css";

const BusinessNeeds = () => {
  const { businessNeeds } = useContext(ShopContext);
  const [latestNeeds, setLatestNeeds] = useState([]);

  useEffect(() => {
    if (Array.isArray(businessNeeds) && businessNeeds.length > 0) {
      setLatestNeeds(businessNeeds.slice(0, 12));
    }
  }, [businessNeeds]);

  return (
    <section className="container-fluid py-4">
      <Helmet>
        <title>Business Needs - Epic Moments</title>
        <meta
          name="description"
          content="Business Solutions, branding, printing services, and corporate needs."
        />
      </Helmet>
<div className="business_main">
  
      <h2 className="text-center fw-bold mb-4">Business Needs</h2>

      {latestNeeds.length === 0 ? (
        <p className="text-center text-muted fs-5">
          No business needs available.
        </p>
      ) : (
        <div className="row g-4 justify-content-center">
          {latestNeeds.map((item) => (
            <div key={item._id} className="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center">
              <BusinessNeedsItem
                id={item._id}
                title={item.title}
                media={item.media?.url}
                priority={item.priority}
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

export default BusinessNeeds;
