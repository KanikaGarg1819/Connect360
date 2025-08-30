import React, { useState } from "react";
import "./App.css";

const data = [
  {
    name: "Ananya Sharma",
    detail1: "University of Delhi",
    detail2: "Computer Science",
    type: "Student",
  },
  {
    name: "Rohan Patel",
    detail1: "IIT Bombay",
    detail2: "Mechanical Engineering",
    type: "Student",
  },
  {
    name: "Tata Consultancy Services",
    detail1: "Company Type",
    detail2: "IT & Services",
    type: "Company",
  },
  {
    name: "Reliance Industries",
    detail1: "Company Type",
    detail2: "Energy, Petrochemicals, Telecom",
    type: "Company",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.detail1.toLowerCase().includes(search.toLowerCase()) ||
      item.detail2.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <h2>Search for MNC's and Student Innovators</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Student">Student</option>
          <option value="Company">Company</option>
        </select>
        <button>Search</button>
      </div>

      <div className="list">
        {filteredData.map((item, index) => (
          <div key={index} className="card">
            <div>
              <h3>{item.name}</h3>
              <p>{item.detail1}</p>
              <p>{item.detail2}</p>
            </div>
            <button className="connect-btn">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
