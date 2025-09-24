import { useState, useRef } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

export default function SpeakButton({ speak }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis); // Reference to speech engine
  const utteranceRef = useRef(null); // Keep track of current utterance

  const handleSpeak = () => {
    if (isSpeaking) {
      // If already speaking → STOP
      synthRef.current.cancel();
      setIsSpeaking(false);
    } else {
      // Start speaking
      utteranceRef.current = speak();
      setIsSpeaking(true);

      // When speech ends, reset button
      utteranceRef.current.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  return (
    <button
      className={`flex justify-center items-center text-white font-medium transition duration-300 h-10 w-10 rounded-full
        ${
          isSpeaking
            ? "bg-red-600 animate-pulse shadow-lg shadow-red-300"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      onClick={handleSpeak}
    >
      {isSpeaking ? "■" : <HiOutlineSpeakerWave className="text-lg" />}
    </button>
  );
}
