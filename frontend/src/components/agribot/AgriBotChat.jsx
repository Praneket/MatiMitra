import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, X, User, Bot } from "lucide-react";

export default function AgriBotChat({ onClose }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Microphone handling
  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert("Your browser doesn't support Speech Recognition.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (e) => {
      const voiceText = e.results[0][0].transcript;
      setInput(voiceText);
      sendMessage(voiceText);
    };

    recognition.start();
  };

  // Handle Send
  const sendMessage = async (message) => {
    const userMsg = message || input;
    if (!userMsg.trim()) return;

    const newChat = [...chat, { role: "user", text: userMsg }];
    setChat(newChat);
    setInput("");

    try {
      const res = await fetch("/api/agri-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response from AI." },
      ]);
      localStorage.setItem(
        "agriChat",
        JSON.stringify([...newChat, { role: "bot", text: data.reply }])
      );
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error connecting to AgriBot." },
      ]);
    }
  };

  // Load chat history
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("agriChat")) || [];
    setChat(stored);
  }, []);

  return (
    <div className="fixed bottom-20 right-6 w-[350px] bg-white shadow-2xl rounded-xl border z-50 flex flex-col max-h-[75vh] overflow-hidden">
      {/* Header */}
      <div className="bg-green-600 text-white p-3 flex justify-between items-center">
        <h2 className="font-semibold">🌱 AgriBot</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-green-50">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] text-sm ${
                msg.role === "user"
                  ? "bg-green-100 text-right"
                  : "bg-white shadow"
              }`}
            >
              <div className="flex items-center gap-2">
                {msg.role === "bot" && (
                  <Bot className="w-4 h-4 text-green-600" />
                )}
                {msg.role === "user" && (
                  <User className="w-4 h-4 text-gray-600" />
                )}
                <span>{msg.text}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={chatRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-3 border-t bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border rounded-l px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={() => sendMessage()}
          className="bg-green-600 text-white px-3 py-2 hover:bg-green-700"
        >
          <Send size={16} />
        </button>
        <button
          onClick={handleMic}
          className={`ml-1 p-2 rounded-full ${
            isListening ? "bg-red-500" : "bg-gray-200"
          }`}
        >
          <Mic className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
}
