import "../index.css";

const TermsPage = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms & Services</h1>
      <section className="terms-section">
        <h2 className="terms-heading">1. Terms</h2>
        <p className="terms-text">
          By accessing CineSense, you agree to be bound by these Terms and Conditions of
          Use and comply with all applicable local laws. If you do not agree with any part
          of these terms, you are prohibited from using this platform. All content on this
          website is protected under copyright and trademark laws.
        </p>

        <h2 className="terms-heading">2. Use License</h2>
        <p className="terms-text">
          Permission is granted to temporarily access one copy of the materials provided
          on the CineSense platform for personal, non-commercial, and temporary viewing
          only. This is a license, not a transfer of title. Under this license, you may
          not:
        </p>
        <ul className="terms-list">
          <li>modify or copy platform materials;</li>
          <li>use the materials for commercial purposes or public display;</li>
          <li>attempt to reverse engineer any software used by CineSense;</li>
          <li>remove copyright or proprietary labels from materials;</li>
          <li>transfer materials to another user or mirror them on another server.</li>
        </ul>

        <p className="terms-text">
          CineSense reserves the right to terminate your access if you violate these
          restrictions. Upon termination, you must delete any downloaded materials in your
          possession, whether in electronic or printed format.
        </p>

        <h2 className="terms-heading">3. Disclaimer</h2>
        <p className="terms-text">
          All materials and content provided on CineSense are offered "as is" without any
          warranty, expressed or implied. CineSense does not guarantee the accuracy,
          reliability, or completeness of any movie data, reviews, ratings, or related
          content displayed on the platform. TMDB data is used under their licensing and
          may not always reflect real-time updates.
        </p>

        <h2 className="terms-heading">4. Limitations</h2>
        <p className="terms-text">
          CineSense will not be held accountable for any damages arising from the use or
          inability to use the platform, including loss of data, profit, or interruptions.
          Some jurisdictions may not allow limitations on implied warranties; therefore,
          such limitations may not apply to you.
        </p>

        <h2 className="terms-heading">5. Revisions & Updates</h2>
        <p className="terms-text">
          The materials on CineSense may include technical, typographical, or visual
          errors. We reserve the right to update or modify content at any time without
          prior notice.
        </p>

        <h2 className="terms-heading">6. Governing Law</h2>
        <p className="terms-text">
          Any claim related to CineSense shall be governed by applicable laws without
          regard to conflict-of-law provisions.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
