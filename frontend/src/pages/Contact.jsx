import React, { useRef, useEffect, useState } from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";

/* ===============================
   EMAILJS CONFIG
================================ */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("");

  /* INIT EMAILJS */
  useEffect(() => {
    if (!PUBLIC_KEY) {
      console.error("❌ EmailJS Public Key missing");
      return;
    }
    emailjs.init(PUBLIC_KEY);
  }, []);

  /* FORM SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!SERVICE_ID || !TEMPLATE_ID) {
      setStatus("❌ Email service not configured");
      return;
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current);
      setStatus("✅ Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("❌ Failed to send message. Try again.");
    }
  };

  return (
    <section className="contact-container">
      <Helmet>
        <title>Contact | Epic Moments</title>
        <meta
          name="description"
          content="Contact Epic Moments for personalized gifts and custom photo products."
        />
      </Helmet>

      {/* HEADER */}
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          Get in Touch with <span className="highlight">EPIC MOMENTS</span>
        </h1>
        <p>We’d love to hear from you 💌</p>
      </motion.div>

      {/* CONTACT DETAILS + MAP */}
      <div className="contact-content">
        {/* LEFT INFO */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>📞 Contact Details</h2>

          <p>
            <FaInstagram />{" "}
            <a
              href="https://www.instagram.com/epicmoments007"
              target="_blank"
              rel="noreferrer"
            >
              @epicmoments007
            </a>
          </p>

          <p>
            <FaFacebook />{" "}
            <a
              href="https://www.facebook.com/share/1BuBjAUYk6/"
              target="_blank"
              rel="noreferrer"
            >
              Epic Moments
            </a>
          </p>

          <p>
            <Mail />{" "}
            <a href="mailto:epicmoments27@gmail.com">
              epicmoments27@gmail.com
            </a>
          </p>

          <p>
            <Phone />{" "}
            <a href="tel:+917989466939">+91 7989466939</a>
          </p>

          <p>
            <MapPin /> Gullapalli, Andhra Pradesh – 522309
          </p>
        </motion.div>

        {/* RIGHT MAP (ALWAYS VISIBLE) */}
        <motion.div
          className="contact-map"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="Epic Moments Location"
            src="https://www.google.com/maps?q=Gullapalli,Andhra%20Pradesh&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "12px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>

      {/* CONTACT FORM */}
      <motion.div
        className="contact-form-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>💬 Send Us a Message</h2>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="tel" name="phone" placeholder="Contact Number" />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            required
          />
          <button type="submit">Send Message</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
