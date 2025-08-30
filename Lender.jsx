import React, { useState } from "react";
import "./Lender.css";
const businessesData = [
  {
    name: "General Store",
    location: "Chandni Chowk",
    amount: 600000,
    progress: 60,
    industry: "Retail",
    impact: [],
  },
  {
    name: "Restaurant",
    location: "Dwarka",
    amount: 400000,
    progress: 40,
    industry: "Food",
    impact: [],
  },
  {
    name: "Tailoring Shop",
    location: "South Delhi",
    amount: 250000,
    progress: 25,
    industry: "Services",
    impact: ["Womervied"],
  },
  {
    name: "Electronics Store",
    location: "South Delhi",
    amount: 800000,
    progress: 80,
    industry: "Manufacturing",
    impact: [],
  },
];

function Filters({ industries, impacts, loanRange, setIndustries, setImpacts, setLoanRange }) {
  const handleIndustryChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setIndustries([...industries, value]);
    } else {
      setIndustries(industries.filter((i) => i !== value));
    }
  };

  const handleImpactChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setImpacts([...impacts, value]);
    } else {
      setImpacts(impacts.filter((i) => i !== value));
    }
  };

  return (
    <aside className="filters">
      <h3>Filters</h3>

      <strong>Industry</strong>
      <label>
        <input type="checkbox" value="Retail" onChange={handleIndustryChange} /> Retail
      </label>
      <label>
        <input type="checkbox" value="Food" onChange={handleIndustryChange} /> Food
      </label>
      <label>
        <input type="checkbox" value="Services" onChange={handleIndustryChange} /> Services
      </label>
      <label>
        <input type="checkbox" value="Manufacturing" onChange={handleIndustryChange} /> Manufacturing
      </label>

      <br />
      <strong>Loan Amount</strong>
      <input
        type="range"
        min="0"
        max="1000000"
        step="10000"
        value={loanRange}
        onChange={(e) => setLoanRange(Number(e.target.value))}
      />
      <span> ₹{loanRange.toLocaleString("en-IN")}</span>

      <br />
      <strong>Social Impact</strong>
      <label>
        <input type="checkbox" value="Womervied" onChange={handleImpactChange} /> Womervied
      </label>
      <label>
        <input type="checkbox" value="Green Business" onChange={handleImpactChange} /> Green Business
      </label>
    </aside>
  );
}

function BusinessCard({ business }) {
  return (
    <div className="card">
      <h4>{business.name}</h4>
      <p>📍 {business.location}</p>
      <p>
        <strong>₹ {business.amount.toLocaleString("en-IN")}</strong>
      </p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${business.progress}%` }}></div>
      </div>
      <div className="actions">
        <button className="know-btn">Know More</button>
        <button className="lend-btn">Lend</button>
      </div>
    </div>
  );
}

function Lender() {
  const [industries, setIndustries] = useState([]);
  const [impacts, setImpacts] = useState([]);
  const [loanRange, setLoanRange] = useState(1000000);

  const filteredBusinesses = businessesData.filter((b) => {
    const matchIndustry = industries.length === 0 || industries.includes(b.industry);
    const matchImpact = impacts.length === 0 || impacts.every((i) => b.impact.includes(i));
    const matchLoan = b.amount <= loanRange;
    return matchIndustry && matchImpact && matchLoan;
  });

  return (
    <div className="app">
      <h1>Explore Businesses</h1>
      <div className="container">
        <Filters
          industries={industries}
          impacts={impacts}
          loanRange={loanRange}
          setIndustries={setIndustries}
          setImpacts={setImpacts}
          setLoanRange={setLoanRange}
        />

        <main className="main">
          <div className="map">
            <img src="image.png" alt="Map" style={{ width: "35%", borderRadius: "10px" }} />
          </div>

          <div className="business-grid">
            {filteredBusinesses.map((b, idx) => (
              <BusinessCard key={idx} business={b} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
export default Lender;