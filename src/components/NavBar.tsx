import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../index.css"; // ensure global styles are available

const logoUrl = "/mnt/data/c960dc54-7214-4fb2-9718-318560fedc8c.png"; // local dev logo path

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-header">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <img src={logoUrl} alt="CineSense" className="nav-logo" />
          <span className="nav-title">CineSense</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end className="nav-link" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/search" className="nav-link" onClick={() => setOpen(false)}>
            Search
          </NavLink>
          <NavLink to="/profile" className="nav-link" onClick={() => setOpen(false)}>
            Profile
          </NavLink>
          <NavLink to="/watchlist" className="nav-link" onClick={() => setOpen(false)}>
            Watchlist
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button
            className="nav-hamburger"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
