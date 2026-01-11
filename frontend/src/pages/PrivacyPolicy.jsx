import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h2>Privacy Policy</h2>

      <p>
        This Privacy Policy describes how <strong>Epic Moments</strong> collects, uses, and protects personal information when you interact with our website and services. This policy may be updated from time to time. By using our website, you agree to the terms outlined here.
      </p>

      <h3>1. Collection of Personal Information</h3>
      <p>We collect personal details during registration or order placement:</p>
      <ul>
        <li>Name, phone number, email, and delivery address</li>
        <li>Uploaded photos and custom messages</li>
        <li>Payment information (handled by Razorpay or Stripe)</li>
      </ul>

      <h3>2. Updating Your Personal Information</h3>
      <p>
        You may update most of your personal data in the “My Profile” section. For critical changes or data deletion, contact us at <strong>epicmoments27@gmail.com</strong>.
      </p>

      <h3>3. How We Use Your Information</h3>
      <ul>
        <li>To process and deliver your customized orders</li>
        <li>To communicate order status and respond to queries</li>
        <li>To improve our products, website, and customer experience</li>
        <li>To send you service or promotional updates (you may opt out)</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h3>4. Uploaded Photos</h3>
      <p>Your uploaded photos are used only to create your ordered products. We do not share, promote, or reuse your images. They are deleted after order fulfillment.</p>

      <h3>5. Data Security</h3>
      <p>
        We use industry-standard encryption and secure servers to protect your data. However, no method of internet transmission is 100% secure. Please use strong passwords and contact us if you notice suspicious activity.
      </p>

      <h3>6. Sharing with Third-Party Services</h3>
      <p>
        We only share necessary data with trusted partners like payment processors and logistics providers. We never sell or rent your data to marketers.
      </p>

      <h3>7. Data Retention</h3>
      <p>
        Your data is retained as long as needed for services or legal reasons. You may request deletion at any time by emailing us.
      </p>

      <h3>8. Email Preferences</h3>
      <p>
        You may unsubscribe from promotional emails at any time. However, we’ll still send essential communications like order confirmations.
      </p>

      <h3>9. Legal Disclosure</h3>
      <p>
        We may disclose personal data if required by law or to protect our business, customers, or others from harm or fraud.
      </p>

      <h3>10. Contact Us</h3>
      <p>
        For questions or concerns about our Privacy Policy, please contact:<br />
        <strong>Email:</strong> epicmoments27@gmail.com
      </p>

      <p className="last-updated">Last updated: July 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
