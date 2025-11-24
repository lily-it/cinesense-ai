import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // stylesheet

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = async () => {
    setMessage("");

    // 🔍 DEBUG LOGS — check env + data
    console.log("EMAIL:", email);
    console.log("PASSWORD LENGTH:", password.length);
    console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("KEY PRESENT:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);

    // ❗ Prevent Supabase 500 errors
    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("LOGIN ERROR:", error.message);
        setMessage(error.message);
      } else {
        console.log("Logged in user:", data.user);

        setMessage("Login successful!");

        setTimeout(() => navigate("/"), 600);
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("SIGNUP ERROR:", error.message);
        setMessage(error.message);
      } else {
        setMessage("Signup successful! Check your email.");
      }
    }
  };

  return (
    <div className="auth-page">
      {/* 🔥 Animated Background */}
      <div className="auth-bg"></div>

      {/* 🔥 Floating Light Animation */}
      <div className="auth-light"></div>

      <div className="auth-card">
        <h1 className="auth-title">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        {message && <p className="auth-message">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleSubmit}>
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="auth-switch-text">
          {mode === "login" ? (
            <>
              New here?{" "}
              <span
                className="auth-switch-link"
                onClick={() => setMode("signup")}
              >
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="auth-switch-link"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
