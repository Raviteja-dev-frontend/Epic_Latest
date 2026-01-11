import React, { useEffect, useState } from "react";
import "./About.css";
import { motion } from "framer-motion";
import { FaMagic, FaGem, FaClock, FaSmile } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";

const About = () => {
  const [keywords, setKeywords] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/keywords`);
        if (res.data.success) {
          setKeywords(res.data.keywords); // Must be array of { keyword, slug }
        }
      } catch (err) {
        console.error("Keyword fetch failed", err);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <section className="epic-about">
     <Helmet>
        <title>About | Epic Moments</title>
        <meta
          name="description"
          content="Epic Moments offers personalized photo gifts like LED lamps, custom frames, and pillows to celebrate life's most special occasions."
        />
        <meta
          name="keywords"
          content="Epic Moments, personalized gifts, photo lamps, custom photo frames, anniversary gifts, birthday gifts, LED photo gifts"
        />
        <meta property="og:title" content="About | Epic Moments" />
        <meta
          property="og:description"
          content="Discover how Epic Moments turns your memories into handcrafted, premium photo gifts. Explore our customization options and product quality."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myepicmoments.com/about" />
        <meta property="og:image" content="https://myepicmoments.com/og-cover.jpg" />
      </Helmet>

      {/* Hero Section */}
      <motion.div
        className="epic-about__hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="epic-about__hero-text">
          <h1>
            Welcome to <span className="epic-about__highlight">EPIC MOMENTS</span>
          </h1>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="epic-about__features">
        <div className="epic_about_text">
         
          <h1>About Us</h1>
          <p>
            <strong>Epic Moments</strong> is a premium brand dedicated to transforming your memories into
            beautifully personalized gifts. We specialize in handcrafted, high-quality products such as{" "}
            <strong>LED photo lamps</strong>, <strong>custom photo frames</strong>,{" "}
            <strong>sublimation pillows</strong>, and <strong>waterproof photo stickers</strong> — all designed to
            capture and celebrate life’s most cherished moments.
            <br /><br />
            Every product is crafted using <strong>top-grade materials</strong> like 5mm MDF wood, glossy laminated
            prints, and vibrant sublimation fabrics. Whether it’s a <strong>birthday</strong>,{" "}
            <strong>anniversary</strong>, <strong>wedding</strong>, or a thoughtful surprise, our creations make
            every occasion truly unforgettable.
            <br /><br />
            At <strong>Epic Moments</strong>, we believe gifts should be as unique as the people receiving them. That’s
            why we offer <strong>full customization</strong> — add your photos, names, dates, or personal messages
            to design something truly one-of-a-kind. Our collection includes rotating lamps, mirror lamps,
            heart-shaped pillows, and more.
            <br /><br />
            With a commitment to <strong>quality, creativity, and timely delivery</strong>, Epic Moments is your trusted
            destination for meaningful personalized gifts. We also welcome <strong>resellers and students</strong> to
            join our growing brand through exciting partnership opportunities.
            <br /><br />
            <em>Create. Personalize. Celebrate. Only with Epic Moments.</em>
          </p>
        

          {/* Dynamic Keyword Links */}
          {keywords.length > 0 && (
            <div className="keyword-links">
              <h3>Explore More Topics:</h3>
              <ul>
                {keywords.map((item, index) => (
                  <li key={index}>
                    <Link to={`/keyword/${item.slug}`} className="keyword-link">
                      {item.keyword}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="card-fuctures">
          <motion.div
            className="card-fuctures_item item--1"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
          >
            <FaMagic className="card-icon-1" />
            <span className="card-fuctures_quantity">Creative Designs</span>
            <span className="card-fuctures_text text--1">
              We blend emotion and artistry to craft magical gifts.
            </span>
          </motion.div>

          <motion.div
            className="card-fuctures_item item--2"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FaGem className="card-icon-2" />
            <span className="card-fuctures_quantity">Premium Quality</span>
            <span className="card-fuctures_text text--2">
              Every product is built with top-notch materials.
            </span>
          </motion.div>

          <motion.div
            className="card-fuctures_item item--3"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FaClock className="card-icon-3" />
            <span className="card-fuctures_quantity">Timely Delivery</span>
            <span className="card-fuctures_text text--3">
              Fast shipping to make every celebration perfect.
            </span>
          </motion.div>

          <motion.div
            className="card-fuctures_item item--4"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <FaSmile className="card-icon-4" />
            <span className="card-fuctures_quantity">Customer First</span>
            <span className="card-fuctures_text text--4">
              Your happiness is our priority and promise.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
