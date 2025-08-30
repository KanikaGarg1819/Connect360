import React, { useState } from "react";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const API_URL =
    "https://api.data.gov.in/resource/36e07927-d20d-4cb1-9a23-2ab40cb1a509?format=json&api-key=579b464db66ec23bdd000001f9c0c046f93b4f6e52f22b9d01c6cfb0&limit=10";
  const suggestions = [
    "Startup India",
    "Skill Development",
    "Agriculture",
    "Education Loan",
    "Women Empowerment",
    "MSME",
    "Digital India",
    "Make in India",
  ];

  const searchSchemes = async (customQuery) => {
    const searchTerm = customQuery || query;
    if (!searchTerm) return;

    setLoading(true);
    setError("");
    setSchemes([]);

    try {
      const res = await fetch(
        API_URL + "&filters[title]=" + encodeURIComponent(searchTerm)
      );
      const data = await res.json();

      if (!data.records || data.records.length === 0) {
        setError("No schemes found for your search.");
      } else {
        setSchemes(data.records);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Check API or network.");
    }
    setLoading(false);
    setShowSuggestions(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", color: "#1a4ba0" }}>
        Search Government Schemes
      </h1>

      {/* 🔹 Search Input with Suggestions */}
      <div style={{ margin: "20px 0", position: "relative", width: "100%", maxWidth: "500px" }}>
        <input
          type="text"
          placeholder="Enter scheme name or keyword..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => searchSchemes()}
          style={{
            background: "#1a73e8",
            color: "white",
            border: "none",
            padding: "10px 20px",
            marginTop: "10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && query && (
          <ul
            style={{
              position: "absolute",
              top: "42px",
              left: "0",
              right: "0",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              listStyle: "none",
              margin: 0,
              padding: "5px 0",
              maxHeight: "150px",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {suggestions
              .filter((s) =>
                s.toLowerCase().includes(query.toLowerCase())
              )
              .map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setQuery(s);
                    searchSchemes(s);
                  }}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                  onMouseDown={(e) => e.preventDefault()} // prevent input blur
                >
                  {s}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Results */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {schemes.map((scheme, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "15px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ fontSize: "20px", color: "#004085" }}>
              {scheme.title || "No Title"}
            </h2>
            <p style={{ color: "#333" }}>
              {scheme.description || "No description available."}
            </p>
            {scheme.url && (
              <a
                href={scheme.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  background: "#28a745",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Know More
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
