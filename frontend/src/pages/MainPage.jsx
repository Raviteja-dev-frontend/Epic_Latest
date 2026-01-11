import React, { useRef, useContext } from 'react';
import './MainPage.css';
import Slider from "./Slider.jsx";
import { assets } from "../assets/assets.js";
import TypingEffect from './TypingEffect.jsx';
import LatestCollection from "../components/LatestCollection.jsx"
import ParallaxBanner from './ParallaxBanner.jsx';
import CatagereCards from './CatagereCards.jsx';
import ADD_Video from '../assets/ADD_Video.mp4';
import ProductSnicks from "./ProductSnicks.jsx";
import BestSeller from "../components/BestSeller.jsx"
import FAQ_Section from './FAQ_Section.jsx';
import Slider_Comments from "./Slider_Comments.jsx"
import { Helmet } from "react-helmet";
function MainPage() {
  return (
    <div className="main-page">
       <Helmet>
        <title>Epic Moments | Personalized Gifts & Photography</title>
        <meta
          name="description"
          content="Discover custom gifts, LED photo lamps, baby & wedding photography, and more. Epic Moments brings creativity to every celebration."
        />
        <meta name="keywords" content="custom gifts, photo lamps, baby photography, wedding photography, epic moments, personalized gifts India" />
        <meta name="author" content="Epic Moments" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook / LinkedIn) */}
        <meta property="og:title" content="Epic Moments | Personalized Gifts & Photography" />
        <meta
          property="og:description"
          content="Premium custom gifts and photography services. Shop personalized photo lamps, cushions, frames & more at Epic Moments."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://epicmoments.in" />
        <meta property="og:image" content="https://epicmoments.in/assets/epicmoments-preview.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Epic Moments | Personalized Gifts & Photography" />
        <meta name="twitter:description" content="Celebrate moments with our custom-made gifts and photography services." />
        <meta name="twitter:image" content="https://epicmoments.in/assets/epicmoments-preview.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Epic Moments",
              "url": "https://epicmoments.in",
              "logo": "https://epicmoments.in/assets/logo_epicmoments.png",
              "image": "https://epicmoments.in/assets/epicmoments-preview.jpg",
              "description": "Epic Moments specializes in customized gifts like photo lamps, frames, and cushions with baby & wedding photography services.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Near Mudu Gullu, Opp. 3 Temples, Main Road",
                "addressLocality": "Gullapalli",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "522309",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91 7989466939",
                "contactType": "Customer Service"
              },
              "sameAs": [
                "https://www.instagram.com/epicmoments007",
                "https://www.facebook.com/share/1BuBjAUYk6/",
                "https://wa.me/message/6NLUMW665UY7K1",
                "https://www.youtube.com/@epicmoments0504",
                "https://x.com/MomentsEpi55910"
              ]
            }
          `}
        </script>
      </Helmet>
      <div className="gold-divider"></div>
      <div className='Screen-2_slideing'>
        <Slider />
      </div>
     {/* <div className="screen-add_forer">
  <div className="screen-add_forer-title">
    <h2>Why Choose Epic Moments Gifts?</h2>
    <p>We bring joy to your special moments with creative, custom-made gifts and exceptional service.</p>
  </div>

  <div className="dignity-wrapper">
    {[
      {
        image: assets.present_1,
        title: "Unique Custom Gifts",
        desc: "Give your loved ones something truly special – fully personalized gifts made with heart and creativity.",
      },
      {
        image: assets.present_2,
        title: "Fast & Reliable Delivery",
        desc: "We ensure your customized gifts reach you quickly and safely, right when you need them.",
      },
   {
  image: assets.present_3,
  title: "Wide Range of Options",
  desc: "We provide all types of photo gifts like frames,keychains, and more for every occasion.",
}


    ].map((item, index) => (
      <div className="dignity-block" key={index}  data-aos="fade-up" data-aos-delay={index * 100}>
        <div className="dignity-image">
          <img src={item.image} alt={item.title} />
        </div>
        <h3 className="h3_title">{item.title}</h3>
        <div className="dignity-description">
          <p>{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div> */}

      <TypingEffect />
      <div className='Latest_div'  data-aos="fade-up">
        <LatestCollection />
      </div>
      <div>
        <ParallaxBanner />
      </div>
      <div className='screen-6'>
        <CatagereCards />
      </div>

      <div className='screen-5'>
        <div className='my_add'>
          <video
            src={ADD_Video}
            autoPlay
            loop
            muted
            playsInline
            className="cover-video"
            poster="/fallback-image.jpg"
          />
        </div>
   <div className="founder-section text-left" data-aos="fade-right">
  <h2 className="founder-title">Our Story</h2>
  <p className="tagline text-lg font-semibold text-red-600 mb-4">
    Crafting Memories That Last Forever
  </p>

<ul className="list-none pl-2 space-y-3 text-gray-800">
  <li>🎉 <strong>Epic Moments</strong> was created to make personalized photo gifts meaningful.</li>
  <li>💝 We believe gifts are emotions beautifully wrapped, not just products.</li>
  <li>🕰️ Our brand turns special occasions into timeless memories.</li>
  <li>🎂 We craft gifts for birthdays, weddings, and everyday surprises.</li>
  <li>📸 Every product is designed to carry a story worth remembering.</li>
  <li>🎨 Attention to detail and creativity make us unique.</li>
  <li>📦 We’re committed to delivering happiness with every package.</li>
  <li>🤝 Our mission is to celebrate love, friendship, and togetherness.</li>
  <li>🌍 We aim to spread joy through personalized gifting in every home.</li>
</ul>

</div>





      </div>

      <ProductSnicks />
      <div className='Dairy_milk'>
        <div className="Dairy_mater">
          <div className="shop-banner">
            <h2 className="shop-title"><p>Discover<br /> Special Gifts at </p><span>Epic Moments</span></h2>
            <a href="/collection" className="shop-now-btn">SHOP NOW</a>
          </div>
        </div>
        <div className='Dairy_image'>
          <img src={assets.Special_2} alt="Special" />
        </div>
      </div>

      <div className='bg-pattern'>
        <BestSeller />
      </div>

      <div className='Slide-8'>
        <FAQ_Section />
        <div className='Slide_comments_main'>
        

          <div className='Comments_box'>
            <Slider_Comments />
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default MainPage;
