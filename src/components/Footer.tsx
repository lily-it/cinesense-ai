// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">

      <h2 className="footer-brand">
        Cine<span className="footer-accent">Sense</span>
      </h2>

      <div className="footer-links">
        <Link to="/faq">FAQ</Link>
        <Link to="/help">Help Center</Link>
        <Link to="/terms">Terms of Use</Link>
        <Link to="/about">About</Link>
      </div>

      <p className="footer-copy">© 2025 CineSense. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
