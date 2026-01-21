import React from "react";
import "./MainPage.css";

import Slider from "./Slider.jsx";
import { assets } from "../assets/assets.js";
import TypingEffect from "./TypingEffect.jsx";
import LatestCollection from "../components/LatestCollection.jsx";
import ParallaxBanner from "./ParallaxBanner.jsx";
import CatagereCards from "./CatagereCards.jsx";
import ProductSnicks from "./ProductSnicks.jsx";
import BestSeller from "../components/BestSeller.jsx";
import FAQ_Section from "./FAQ_Section.jsx";
import Slider_Comments from "./Slider_Comments.jsx";
import { Helmet } from "react-helmet";

function MainPage() {
  return (
    <div className="main-page">

      <Helmet>
        <title>Epic Moments | Personalized Gifts & Photography</title>
        <meta
          name="description"
          content="Discover custom gifts, LED photo lamps, baby & wedding photography, and more."
        />
      </Helmet>

      <div className="gold-divider"></div>

      <div className="Screen-2_slideing">
        <Slider />
      </div>

      <TypingEffect />

      <div className="Latest_div" data-aos="fade-up">
        <LatestCollection />
      </div>

      <ParallaxBanner />

      <div className="screen-6">
        <CatagereCards />
      </div>

      {/* Founder Section */}
      <div className="founder-section text-left" data-aos="fade-right">
        <h2 className="founder-title">Our Story</h2>
        <p className="tagline text-lg font-semibold text-red-600 mb-4">
          Crafting Memories That Last Forever
        </p>

        <ul className="list-none pl-2 space-y-3 text-gray-800">
          <li>🎉 Epic Moments was created to make personalized photo gifts meaningful.</li>
          <li>💝 Gifts are emotions, not just products.</li>
          <li>🕰️ Turning occasions into timeless memories.</li>
          <li>🎂 Gifts for birthdays, weddings, and surprises.</li>
          <li>📸 Every product carries a story.</li>
          <li>🎨 Crafted with creativity and care.</li>
          <li>📦 Delivering happiness with every package.</li>
          <li>🤝 Celebrating love and togetherness.</li>
          <li>🌍 Spreading joy through gifting.</li>
        </ul>
      </div>

      <ProductSnicks />

      <div className="Dairy_milk">
        <div className="Dairy_mater">
          <div className="shop-banner">
            <h2 className="shop-title">
              <p>Discover<br /> Special Gifts at </p>
              <span>Epic Moments</span>
            </h2>
            <a href="/collection" className="shop-now-btn">SHOP NOW</a>
          </div>
        </div>

        <div className="Dairy_image">
          <img src={assets.Special_2} alt="Special" />
        </div>
      </div>

      <div className="bg-pattern">
        <BestSeller />
      </div>

      <div className="Slide-8">
        <FAQ_Section />

        <div className="Slide_comments_main">
          <div className="Comments_box">
            <Slider_Comments />
          </div>
        </div>
      </div>

    </div>
  );
}

export default MainPage;

