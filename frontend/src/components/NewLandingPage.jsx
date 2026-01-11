import React, { useContext, useState, useEffect } from "react";
import "./NewLandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// CONTEXT
import { ShopContext } from "../context/ShopContext.jsx";

// COMPONENTS
import PopularProducts from "../components/PopularProducts";
import OfferProducts from "../components/OfferProducts";
import LatestCollection from "../components/LatestCollection.jsx";
import DeskDecoratives from "../components/DeskDecoratives.jsx";
import WallDecoratives from "../components/WallDecoratives.jsx";
import CarDecoratives from "../components/CarDecoratives.jsx";
import BusinessNeeds from "../components/BusinessNeeds.jsx";
import GoogleReviews from "./GoogleReviews.jsx";

// ASSETS
import epic_banner from "../assets/Epic_new_banner.jpg";
import birthday_album from "../assets/birthday_album.jpg";
import wedding_album from "../assets/wedding_album.jpg";
import { FaTruck, FaUndoAlt, FaMedal } from "react-icons/fa";
import { assets } from "../assets/assets.js";

const NewLandingPage = () => {
  const { setShowSearch, navigate, products, setSearch } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  // Handle search click or Enter
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSearch(searchQuery); // Save to context for collection page
    setShowSearch(true);
    navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="running-text-container">

      {/* TOP RUNNING TEXT */}
      <div className="running-text-wrapper">
        <div className="running-text">
          <div className="rocket-container">
            <MdOutlineRocketLaunch />
            <div className="rocket-smoke"></div>
          </div>
          <p className="running-line">
            Loved by 1,00,000+ Customers |
            <strong> Trusted Quality Since 2021 </strong> |
            Your Memories Deserve the Best |
            <strong> Turn Every Moment Into Beautiful Prints </strong>
          </p>
        </div>
      </div>

      {/* MAIN TITLE SECTION */}
      <section className="landing-Title_section container text-center">
        <h1 className="main-title">
          Bring Your Photos to Life with Custom Products
        </h1>

        {/* SEARCH BAR */}
        <div className="search-wrapper hstack rounded-pill">
          <input
            type="search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search for Wooden Photo Stands, Snapbooks etc."
            className="search-input fst-italic rounded-pill form-control border-0 px-4 py-2 text-dark"
          />
          <div className="vr search-divider mx-2"></div>
          <img
            onClick={handleSearch}
            src={assets.search_icon}
            className="searchbar-icon"
            alt="Search"
          />
        </div>

        {/* SEARCH RESULTS */}
        {searchQuery && (
          <div className="search-results mt-3">
            {filteredProducts.length > 0 ? (
              <ul className="list-group">
                {filteredProducts.map((p) => (
                  <li key={p._id} className="list-group-item">
                    {p.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-results">No products found.</p>
            )}
          </div>
        )}
      </section>

      {/* POPULAR PRODUCTS */}
      <PopularProducts />

      {/* OFFER PRODUCTS */}
      <OfferProducts />

      {/* LATEST COLLECTION */}
      <LatestCollection />

      {/* STATIC BANNER */}
      <div className="banner-container">
        <img src={epic_banner} alt="Epic Banner" className="img-fluid w-100" />
      </div>

      {/* DECORATIVES */}
      <DeskDecoratives />
      <WallDecoratives />

      {/* STUDIO ALBUMS */}
      <section className="studio-albums-section container-fluid">
        <h2 className="text-center studio-heading">Premium Albums</h2>

        <div className="row justify-content-center mt-4">
          <div className="col-6 col-md-6">
            <div className="album-card">
              <img
                src={wedding_album}
                alt="Wedding Album"
                className="img-fluid rounded-4 shadow-sm album-img"
              />
            </div>
          </div>

          <div className="col-6 col-md-6">
            <div className="album-card">
              <img
                src={birthday_album}
                alt="Birthday Album"
                className="img-fluid rounded-4 shadow-sm album-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MORE SECTIONS */}
      <CarDecoratives />
      <BusinessNeeds />
      <GoogleReviews />

      <div className="home-bottom">
        {/* FIND GIFTS BANNER */}
        <div className="gift-banner">
          <div className="banner-content">
            <h1 className="banner-title">
              FIND <br /> THE PERFECT GIFT
            </h1>
            <p className="banner-sub">
              Explore Gifts by Relationships, Occasions & Recipient.
            </p>
       <button
  className="banner-btn"
  onClick={() => navigate("/collections")}
>
  START NOW →
</button>
          </div>
        </div>

         <div className="hg-container">

      {/* ICONS ROW */}
      <div className="hg-icons-row">
        <div className="hg-icon-box">
          <div className="hg-icon-wrapper">
            <FaUndoAlt className="hg-icon" />
          </div>
          <p>No Return Policy</p>
        </div>

        <div className="hg-icon-box">
          <div className="hg-icon-wrapper">
            <FaTruck className="hg-icon" />
          </div>
          <p>Express Delivery</p>
        </div>

        <div className="hg-icon-box">
          <div className="hg-icon-wrapper">
            <FaMedal className="hg-icon" />
          </div>
          <p>100% Quality Assured</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container hg-main-box">
        <div className="row align-items-center">

          {/* LEFT */}
          <div className="col-md-6 mb-4 hg-left">
            <h2>OUR VISION</h2>
            <p>
              In line with our vision, we wish to be recognized as an organization
              renowned for its creative solutions, innovation, and quality.
            </p>
            <p>
              We also aim to re-calibrate the benchmark standards in designing and
              printing products tailored to meet the needs of a diverse customer base.
            </p>
              <h2 className="hg-title">
              WE ARE <span>HOMEGROWN.</span>
            </h2>

            <ul className="hg-list">
              <li>Printing your memories since 2021</li>
              <li>Everything is personalised</li>
              <li>Guaranteed high quality products</li>
              <li>Free delivery All Over India</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="col-md-6 hg-right">
          

            <div className="row hg-stats mt-4">
              <div className="col-6 mb-3">
                <h3>24K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="col-6 mb-3">
                <h3>6264+</h3>
                <p>Google Reviews</p>
              </div>
              <div className="col-6 mb-3">
                <h3>50K+</h3>
                <p>Products Delivered</p>
              </div>
              <div className="col-6 mb-3">
                <h3>5000+</h3>
                <p>5-Star Ratings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BULK CTA */}
      <div className="container">
        <div className="bulk-box">
          <div>
            <h3>Need Bulk Quantities?</h3>
            <p>
              We've got you covered! Enjoy competitive pricing and fast delivery on all your bulk orders.
            </p>
          </div>
<button
  className="contact-btn"
  onClick={() => navigate("/contact")}
>
  CONTACT US
</button>
        </div>
      </div>

    </div>
      </div>
    </div>
  );
};

export default NewLandingPage;
