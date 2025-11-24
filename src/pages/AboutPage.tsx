import "../index.css";

const AboutPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About CineSense</h1>
      <p className="page-subtitle">
        Your intelligent companion for discovering movies you'll truly love.
      </p>

      <section className="about-section">
        <h2 className="about-heading">1. Our Mission</h2>
        <p className="about-text">
          CineSense was built with a vision to transform the way people explore cinema.
          We aim to eliminate endless scrolling and make movie discovery smart,
          personalized, and effortless. Whether you're a casual viewer or a film
          enthusiast, CineSense adapts to your taste and delivers meaningful
          recommendations.
        </p>

        <h2 className="about-heading">2. How CineSense Works</h2>
        <p className="about-text">
          Our platform uses advanced machine learning algorithms trained on genre
          behavior, viewer interactions, trending patterns, and emotional tones. As you
          browse movies, interact with content, or save favorites, our AI continually
          learns and tailors recommendations to your preferences.
        </p>
        <p className="about-text">
          CineSense analyzes:
        </p>
        <ul className="about-list">
          <li>Your favorite genres and themes</li>
          <li>Viewing patterns and history</li>
          <li>Trending movies worldwide</li>
          <li>Similar user preferences</li>
        </ul>

        <h2 className="about-heading">3. What Makes CineSense Unique</h2>
        <p className="about-text">
          CineSense is more than a recommendation engine—it's a complete cinematic guide.
          Our focus is on making your viewing experience enjoyable and efficient. Here's
          what sets us apart:
        </p>
        <ul className="about-list">
          <li>Highly personalized AI-powered movie suggestions</li>
          <li>Minimal scrolling with precise recommendations</li>
          <li>Curated lists based on moods, genres, and trends</li>
          <li>Clean, intuitive user experience</li>
        </ul>

        <h2 className="about-heading">4. Data Sources</h2>
        <p className="about-text">
          CineSense uses movie information sourced from The Movie Database (TMDB). Their
          rich, community-driven database ensures accurate details, cast listings,
          ratings, posters, and more. We acknowledge and appreciate their contribution to
          global film accessibility.
        </p>

        <h2 className="about-heading">5. A Platform Built for You</h2>
        <p className="about-text">
          Your feedback helps shape the future of CineSense. Whether it's feature
          requests, UI improvements, or suggestions, we value your input. Visit our
          Contact page anytime—we're always happy to hear from our users.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;