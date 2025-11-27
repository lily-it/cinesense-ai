import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ⭐ Username field
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  // ----------------------------------------------------
  // ⭐ Redirect logged-in users away from /auth
  // ----------------------------------------------------
  useEffect(() => {
    const checkLoggedIn = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/", { replace: true });
      }
    };

    checkLoggedIn();
  }, [navigate]);

  // ----------------------------------------------------
  // ⭐ LOGIN + SIGNUP HANDLER
  // ----------------------------------------------------
  const handleSubmit = async () => {
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required.");
      return;
    }

    if (mode === "signup" && !username.trim()) {
      setMessage("Username is required.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    // ----------------------------------------------
    // ⭐ LOGIN
    // ----------------------------------------------
    if (mode === "login") {
      const {  error } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Login successful!");

        // ⭐ Instant redirect (no flicker, no delay)
        navigate("/", { replace: true });
      }

      return;
    }

    // ----------------------------------------------
    // ⭐ SIGNUP — save username in metadata
    // ----------------------------------------------
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username, // ⭐ Important
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Check your email to confirm.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg"></div>
      <div className="auth-light"></div>

      <div className="auth-card">
        <h1 className="auth-title">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        {message && <p className="auth-message">{message}</p>}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* USERNAME (Signup Only) */}
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button className="auth-button" onClick={handleSubmit}>
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        {/* SWITCH LOGIN / SIGNUP */}
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
