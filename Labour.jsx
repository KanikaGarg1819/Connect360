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
    name: "Kanika Garg",
    detail1: "Delhi Technological University",
    detail2: "Production Technology",
    type: "Company",
  },
  {
    name: "Ritika Saini",
    detail1: "Netaji Subash University of Technology",
    detail2: "Bio-Technology",
    type: "Student",
  },
   {
    name: "Divyanshu Arya",
    detail1: "Vivekananda Institute of Professional Studies",
    detail2: "Chemical Technology",
    type: "Student",
  },
   {
    name: "Pooja Kumari",
    detail1: "Shiv Nadar University",
    detail2: "Petroleum Technology",
    type: "Student",
  },
   {
    name: "Kavya Maheshwari",
    detail1: "University School of Automation & Robotics",
    detail2: "Automation & Robotics",
    type: "Student",
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
