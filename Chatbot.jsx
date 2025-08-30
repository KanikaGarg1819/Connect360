import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋! I can help with Govt Schemes, MSME registration, or investments. Ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠ Error connecting to AI." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="typing">Bot is typing...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask me about MSMEs, loans, or schemes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button onClick={() => sendMessage(input)}>Send</button>
      </div>
    </div>
  );
};
export default Chatbot;
