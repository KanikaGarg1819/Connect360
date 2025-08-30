import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // external CSS file
import Home from "./Home";
import Lender from "./Lender";
import Discover from "./Discover";
function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
function InfoBox({ icon, text }) {
  return (
    <div className="info-box">
      <div className="info-icon">{icon}</div>
      <strong>{text}</strong>
    </div>
  );
}
export default function Connect360() {
  const [hover, setHover] = useState(false);

  return (
    <div className="app">
      <header>
        <nav>
          <a href="#">Home</a>
          <Link to="/Lender">Lend</Link>
           <Link to="/Discover">Discover</Link>
          <a href="#">Help</a>
        </nav>
        <div className="auth-buttons">
          <button className="bg-black">Login</button>
          <button>Sign Up</button>
        </div>
      </header>

      <section className="hero">
        <h1>Connect360</h1>
      </section>

      <section className="subheading">
        Empowering Local Businesses with Access to Credit and Growth Opportunities
      </section>

      <section className="features">
        <FeatureCard icon="🔍" title="Discover" text="small businesses and govt schemes" />
        <FeatureCard icon="🤝" title="Lend" text="securely through our verified platform" />
        <FeatureCard icon="ℹ️" title="Help" text="Find skilled labours. MNC's corner" />
      </section>

      <section className="info-boxes">
        <InfoBox icon="📊" text="Financial literacy and business" />
        <InfoBox icon="📄" text="Documentation needed for loans" />
        <InfoBox icon="❓" text="Understanding interest rates" />
      </section>

      <div className="register">
        <div
          className={`register-box ${hover ? "hover" : ""}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Register Now
        </div>
        <div className="msme_marker">*For MSME</div>
      </div>
    </div>
  );
}