import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import DeskDecorativesItem from "./DeskDecorativesItem";
import { Helmet } from "react-helmet";
import "./deskDecoratives.css";

const DeskDecoratives = () => {
  const { deskDecoratives } = useContext(ShopContext);
  const [latestDeskDecor, setLatestDeskDecor] = useState([]);

  useEffect(() => {
    if (Array.isArray(deskDecoratives) && deskDecoratives.length > 0) {
      setLatestDeskDecor(deskDecoratives.slice(0, 10));
    }
  }, [deskDecoratives]);

  return (
    <section className="container-fluid">

      <Helmet>
        <title>Desk Decoratives - Epic Moments</title>
        <meta
          name="description"
          content="Beautiful desk decoratives including name plates, acrylic frames, desk gifts and more."
        />
      </Helmet>

      <div className="Desk_main">
        <h2 className="text-center fw-bold mb-4">Desk Decoratives</h2>

        {latestDeskDecor.length === 0 ? (
          <p className="text-center text-muted fs-5">
            No desk decoratives available.
          </p>
        ) : (
          <div className="row justify-content-center">
            {latestDeskDecor.map((item) => (
              <div key={item._id} className="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center">
                <DeskDecorativesItem
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

export default DeskDecoratives;
