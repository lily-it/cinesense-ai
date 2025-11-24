import "../index.css";

const FAQPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Frequently Asked Questions</h1>
      <p className="page-subtitle">Find answers to the most common questions about CineSense.</p>

      {/* Section 1: General Questions */}
      <section className="faq-section">
        <h2 className="faq-heading">1. General Questions</h2>

        <div className="faq-item">
          <h3>🎬 What is CineSense?</h3>
          <p className="faq-text">
            CineSense is an AI-powered movie discovery platform designed to help users
            explore trending films, hidden gems, and curated recommendations that match
            their personal taste.
          </p>
        </div>

        <div className="faq-item">
          <h3>📱 Is CineSense free to use?</h3>
          <p className="faq-text">
            Yes! CineSense is completely free for browsing movies, exploring trends, and
            discovering recommendations.
          </p>
        </div>
      </section>

      {/* Section 2: Accounts & Personalization */}
      <section className="faq-section">
        <h2 className="faq-heading">2. Accounts & Personalization</h2>

        <div className="faq-item">
          <h3>⭐ Do I need an account?</h3>
          <p className="faq-text">
            Creating an account is optional but recommended. An account allows you to:
          </p>
          <ul className="faq-list">
            <li>Save your favorite movies</li>
            <li>Create and manage watchlists</li>
            <li>Receive highly personalized recommendations</li>
            <li>Sync preferences across devices</li>
          </ul>
        </div>

        <div className="faq-item">
          <h3>🧠 How does AI recommend movies?</h3>
          <p className="faq-text">
            Our recommendation system analyzes your interactions, including:
          </p>
          <ul className="faq-list">
            <li>Genres you frequently explore</li>
            <li>Movies you rate or add to favorites</li>
            <li>Trending behavior from global audiences</li>
            <li>Your browsing and viewing patterns</li>
          </ul>
          <p className="faq-text">Over time, CineSense becomes smarter and more accurate.</p>
        </div>
      </section>

      {/* Section 3: Movie Information */}
      <section className="faq-section">
        <h2 className="faq-heading">3. Movie Data & Accuracy</h2>

        <div className="faq-item">
          <h3>🎞 Where does CineSense get movie information?</h3>
          <p className="faq-text">
            CineSense uses movie data from The Movie Database (TMDB), a trusted and
            community-driven source. This ensures reliable movie summaries, cast lists,
            posters, ratings, and more.
          </p>
        </div>

        <div className="faq-item">
          <h3>❗ Why do some movies have missing or outdated information?</h3>
          <p className="faq-text">
            Since TMDB is community-updated, changes may take time to reflect. If you
            spot outdated or incorrect information, you can report it directly on TMDB.
          </p>
        </div>
      </section>

      {/* Section 4: Technical Questions */}
      <section className="faq-section">
        <h2 className="faq-heading">4. Technical Questions</h2>

        <div className="faq-item">
          <h3>⚙️ Movies are not loading. What should I do?</h3>
          <p className="faq-text">
            Movie loading issues are often related to slow internet or temporary TMDB
            outages. Try refreshing, checking your connection, or coming back later.
          </p>
        </div>

        <div className="faq-item">
          <h3>💾 Why do recommendations seem inaccurate?</h3>
          <p className="faq-text">
            Recommendations improve with interaction. To help the AI become more accurate:
          </p>
          <ul className="faq-list">
            <li>Rate movies you watch</li>
            <li>Add films to your favorites</li>
            <li>Engage with genres you enjoy</li>
          </ul>
        </div>
      </section>

      {/* Section 5: Support */}
      <section className="faq-section">
        <h2 className="faq-heading">5. Support & Assistance</h2>

        <div className="faq-item">
          <h3>📧 How can I contact support?</h3>
          <p className="faq-text">
            Visit our Help Center for troubleshooting solutions, or send us a message
            through the Contact page. We typically respond within 24–48 hours.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;