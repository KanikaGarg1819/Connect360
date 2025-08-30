import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Lender from "./Lender";
import Discover from "./Discover";
import Chatbot from "./Chatbot";

function App() {
  return (
    <BrowserRouter>
      <div className="app bg-black">
        <header>
          {/* Example Navigation */}
          <nav>
            <Link to="/">Home</Link> | 
            <Link to="/lender">Lender</Link> | 
            <Link to="/discover">Discover</Link> | 
            <Link to="/help">Help</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lender" element={<Lender />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/help" element={<Chatbot />} />
        </Routes>

        <Chatbot />
      </div>
    </BrowserRouter>
  );
}
export default App;
