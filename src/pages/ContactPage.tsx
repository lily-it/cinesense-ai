import React, { useState } from "react";
import "../index.css";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: integrate Supabase or EmailJS
    console.log("Message Sent:", { name, email, message });

    setStatus("Your message has been sent! We’ll reply soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <p className="contact-subtitle">
        Have questions or feedback? We’d love to hear from you.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        
        <input
          className="contact-input"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="contact-input"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          className="contact-textarea"
          placeholder="Your Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button className="contact-btn" type="submit">Send Message</button>
      </form>

      {status && <p className="contact-status">{status}</p>}
    </div>
  );
};

export default ContactPage;
