// 📁 src/components/AgriBotButton.jsx
import React, { useState } from "react";
import { Bot } from "lucide-react";
import AgriBotWindow from "./AgriBotWindow";
import { FaComments } from "react-icons/fa";

export default function AgriBotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        <FaComments className="text-xl" />
      </button>

      {/* AgriBot Window */}
      {open && <AgriBotWindow onClose={() => setOpen(false)} />}
    </>
  );
}
