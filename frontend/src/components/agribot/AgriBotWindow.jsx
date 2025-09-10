import React, { useState, useRef } from "react";
import { Mic, Send, X } from "lucide-react";
import { TbInnerShadowBottomLeft } from "react-icons/tb";
export default function AgriBotWindow({ onClose }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setQuery(voiceText);
      handleSend(voiceText); // auto-send after speech
    };

    recognition.start();
  };

  const handleSend = async (customQuery = query) => {
    if (!customQuery.trim()) return;

    setResponse("🤖 Thinking...");

    // Replace this with your OpenAI/AI API call
    try {
      const res = await fetch("/api/agri-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: customQuery }),
      });
      const data = await res.json();
      setResponse(data.reply || "No response from AI.");
    } catch (error) {
      setResponse("❌ Error fetching response.");
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-lg border z-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 text-white px-4 py-2 rounded-t-lg">
        <h2 className="font-semibold flex items-center gap-1">
          <TbInnerShadowBottomLeft />
          AgriBot
        </h2>
        <button onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        {/* AI response */}
        {response && (
          <div className="bg-green-50 text-green-800 p-2 rounded text-sm">
            {response}
          </div>
        )}

        {/* Text Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            onClick={handleMicClick}
            className={`p-2 rounded-full ${
              isListening ? "bg-red-500" : "bg-gray-200"
            }`}
          >
            <Mic className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
