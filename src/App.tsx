// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";

// Footer link pages
import FAQPage from "./pages/FAQPage";
import HelpPage from "./pages/HelpPage";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">

        {/* ALL ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Footer Pages */}
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        {/* ⭐ GLOBAL FOOTER */}
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} CineSense — Built with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/dixika-thakur-928b20369"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Dixika Thakur
            </a>
          </p>
        </footer>

      </div>
    </BrowserRouter>
  );
};

export default App;
