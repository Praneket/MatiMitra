import { Mic, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { TbInnerShadowBottomLeft } from "react-icons/tb";
import { useAgriBot } from "../../context/AgriBotContext";

const SimpleModal = ({ isOpen, onClose }) => {
  const { chat, setChat, input, setInput, sendMessage } = useAgriBot();

  const chatRef = useRef();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

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

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl h-[80vh] max-h-[80vh] overflow-auto mt-2 mb-2 relative">
          <div className="sticky top-0 bg-green-600 text-white p-3 flex justify-between items-center">
            <h2 className="font-semibold flex items-center gap-1">
              <TbInnerShadowBottomLeft />
              AgriBot
            </h2>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-white cursor-pointer text-2xl"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-2 mt-2">
            {/* Messages */}
            <div className="flex-1 flex flex-col overflow-y-auto p-3 space-y-3 bg-green-50">
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
                      <span>{msg.text}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatRef} />
            </div>
            {/* Input */}
            <div className=" sticky bottom-0 border-t p-3 w-full bg-white flex items-center">
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
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
