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
      <Routes>
        {/* MAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* FOOTER ROUTES */}
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
