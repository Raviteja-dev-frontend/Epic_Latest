import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => (
  <div className="terms-container">
    <h2>Terms and Conditions</h2>
    <p>
      Welcome to <strong>Epic Moments</strong>. By using our website and placing an order, you agree to the following terms:
    </p>

    <h3>1. Order Process</h3>
    <p>
      Orders are confirmed once payment is completed. Since our products are customized, orders cannot be changed or canceled once confirmed.
    </p>

    <h3>2. Product Customization</h3>
    <p>
      We rely on the photos, text, and instructions you provide. Please ensure they are accurate, appropriate, and of good quality.
    </p>

    <h3>3. Delivery</h3>
    <p>
      We strive to deliver orders on time. However, delays due to courier partners, natural calamities, or local restrictions are beyond our control.
    </p>

    <h3>4. Return & Refund</h3>
    <p>
      Customized products are non-returnable unless they arrive damaged or incorrect. In such cases, contact us within 48 hours of delivery for resolution.
    </p>

    <h3>5. Intellectual Property</h3>
    <p>
      By uploading photos or content, you confirm that you own the rights to use them. We are not responsible for any copyright issues arising from unauthorized uploads.
    </p>

    <h3>6. Payment</h3>
    <p>
      All transactions are securely processed via Razorpay or Stripe. We do not store your card or banking details.
    </p>

    <h3>7. Changes to Terms</h3>
    <p>
      Epic Moments may update these terms at any time without prior notice. Please check this page regularly for changes.
    </p>

    <p>
      For any questions, contact us at: <strong>epicmoments27@gmail.com</strong>
    </p>

    <p className="last-updated">Last updated: July 2025</p>
  </div>
);

export default TermsAndConditions;
