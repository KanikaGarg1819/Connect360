import express from "express";
import cors from "cors";
// Node 18+ me fetch built-in hota hai. Agar error aaye toh:
// import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Direct Gemini API key (testing purpose)
const GEMINI_API_KEY = "AIzaSyDrI_xLi1mqsHzU3wFe1qCwhuHMHleAxjQ";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const schemes = [
  { key: "cgtmse", name: "CGTMSE", desc: "Collateral-free loans up to ₹5 crore with govt guarantee." },
  { key: "startupindia", name: "Startup India Initiative", desc: "Tax exemptions, self-certification, IPR support for startups." },
  { key: "standup", name: "Stand-Up India", desc: "Loans ₹10 lakh–1 crore for SC/ST & women entrepreneurs." },
  { key: "pmvksy", name: "PM Vishwakarma Yojana", desc: "₹15,000 toolkit grant + collateral-free loans at 5%." },
  { key: "udyam", name: "Udyam Registration", desc: "MSME registration benefits with access to schemes, subsidies." }
];

// ✅ Govt schemes list
app.get("/api/schemes", (req, res) => res.json(schemes));

// ✅ Chatbot API
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const lower = message.toLowerCase();

  // Scheme keyword check
  const scheme = schemes.find(
    (s) => lower.includes(s.key) || lower.includes(s.name.toLowerCase())
  );
  if (scheme) {
    return res.json({ reply: `${scheme.name}: ${scheme.desc}` });
  }

  // Call Gemini API
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I’m not sure about that.";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ reply: "Error contacting Gemini service." });
  }
});

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
