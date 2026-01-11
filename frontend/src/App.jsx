import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

// Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import MainPage from "./pages/MainPage";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import KeywordList from "./pages/KeywordList";
import KeywordPage from "./pages/KeywordPage";
import GoogleReviews from "./components/GoogleReviews";
import SendOrderMail from "./components/SendOrderMail";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import NewLandingPage from "./components/NewLandingPage";
import PopularProducts from "./components/PopularProducts";
import OfferProducts from "./components/OfferProducts";
import DeskDecoratives from "./components/DeskDecoratives";
import WallDecoratives from "./components/WallDecoratives";
import CarDecoratives from "./components/CarDecoratives";
import BusinessNeeds from "./components/BusinessNeeds";

// Libraries
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AOS from "aos";
import "aos/dist/aos.css";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });

    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <HelmetProvider>
      <ToastContainer />
      <Navbar />

      <div className="pt-20">
        <ScrollToTop />
        <SearchBar />

        <Routes>
          {/* ---------- Main Pages ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collection />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ---------- Product Pages ---------- */}
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          {/* ---------- Auth ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />

          {/* ---------- Orders ---------- */}
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />

          {/* ---------- Extra Features ---------- */}
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/sendOrderMail" element={<SendOrderMail />} />

          {/* ---------- Legal ---------- */}
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />

          {/* ---------- Keyword SEO Pages ---------- */}
          <Route path="/keywords" element={<KeywordList />} />
          <Route path="/keyword/:slug" element={<KeywordPage />} />

          {/* ---------- Section Pages ---------- */}
          <Route path="/newlandingpage" element={<NewLandingPage />} />
          <Route path="/popular-products" element={<PopularProducts />} />
          <Route path="/offer-products" element={<OfferProducts />} />
          <Route path="/desk-decoratives" element={<DeskDecoratives />} />
          <Route path="/wall-decoratives" element={<WallDecoratives />} />
          <Route path="/car-decoratives" element={<CarDecoratives />} />
          <Route path="/business-needs" element={<BusinessNeeds />} />
          <Route path="/google-reviews" element={<GoogleReviews />} />
        </Routes>
      </div>

      <Footer />
    </HelmetProvider>
  );
};

export default App;
