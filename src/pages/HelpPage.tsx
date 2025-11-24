import "../index.css";

const HelpPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Help Center</h1>
      <p className="page-subtitle">Find solutions, troubleshooting steps, and guidance for using CineSense effectively.</p>

      <section className="help-section">
        <h2 className="help-heading">1. Account & Login Support</h2>
        <h3 className="help-subheading">🔐 Forgot Your Password?</h3>
        <p className="help-text">
          If you're unable to log in due to a forgotten password, click on the "Forgot Password?" option 
          on the login screen. Enter your registered email address to receive a password reset link. 
          If the email doesn't arrive within a few minutes, check your spam folder or try again.
        </p>
        <p className="help-text">
          If the issue persists, contact us through the Contact page for manual assistance.
        </p>
      </section>

      <section className="help-section">
        <h2 className="help-heading">2. Movie Loading & Playback Issues</h2>
        <h3 className="help-subheading">🎞 Movies Not Loading or Showing Errors?</h3>
        <p className="help-text">
          Loading issues are often related to internet connectivity or temporary TMDB outages.
          Try the following steps:
        </p>
        <ul className="help-list">
          <li>Refresh the page and try again</li>
          <li>Ensure your internet connection is stable</li>
          <li>Clear your browser cache and cookies</li>
          <li>Try loading the content after a few minutes</li>
        </ul>
      </section>

      <section className="help-section">
        <h2 className="help-heading">3. Recommendation Issues</h2>
        <h3 className="help-subheading">🧠 Recommendations Seem Inaccurate?</h3>
        <p className="help-text">
          Our AI learns from your interactions. To improve accuracy, try:
        </p>
        <ul className="help-list">
          <li>Rating movies you watch</li>
          <li>Adding titles to your favorites or watchlist</li>
          <li>Exploring genres you enjoy</li>
        </ul>
        <p className="help-text">
          The more you interact, the better CineSense understands your taste.
        </p>
      </section>

      <section className="help-section">
        <h2 className="help-heading">4. Performance & Speed</h2>
        <h3 className="help-subheading">⚙️ App Feels Slow?</h3>
        <p className="help-text">
          If CineSense is running slow, try the following optimizations:
        </p>
        <ul className="help-list">
          <li>Close unused browser tabs</li>
          <li>Disable heavy browser extensions</li>
          <li>Update your browser to the latest version</li>
          <li>Verify your network strength</li>
        </ul>
      </section>

      <section className="help-section">
        <h2 className="help-heading">5. Need Further Assistance?</h2>
        <h3 className="help-subheading">📬 Still Need Help?</h3>
        <p className="help-text">
          We're always here to assist you. Visit the Contact page and send us a message — our support team
          usually responds within 24–48 hours.
        </p>
      </section>
    </div>
  );
};

export default HelpPage;