import { useState } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
export default function SpeakButton({ speak }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speak();

    // Stop animation after speech ends (adjust timing if needed)
    setTimeout(() => {
      setIsSpeaking(false);
    }, 4000); // adjust according to text length
  };

  return (
    <button
      className={`flex  justify-center items-center   text-white font-medium transition duration-300  h-10 w-10 rounded-full
      ${
        isSpeaking
          ? "bg-blue-600 animate-pulse shadow-lg shadow-red-300"
          : "bg-blue-500 text-black hover:bg-blue-600"
      }`}
      onClick={handleSpeak}
    >
      {isSpeaking ? "..." : <HiOutlineSpeakerWave className="text-lg" />}
    </button>
  );
}
