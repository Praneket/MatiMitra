import React from "react";
import { TypeAnimation } from "react-type-animation";
import SpeakButton from "./SpeakButton";

export default function AIRecommendation({ message, speak }) {
  // Split into lines wherever there's a number-dot-space (e.g. "1. ", "2. ")
  const formatMessage = (msg) => {
    return msg
      .split(/\d\.\s/) // cut at "1. ", "2. ", etc.
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  const formattedPoints = formatMessage(message);

  return (
    <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 my-10 shadow-md">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
            Farming Tips (AI Powered)
          </h2>
          <div className="space-y-2 text-gray-800 text-base font-medium leading-relaxed">
            {formattedPoints.map((point, index) => (
              <p key={index}>
                {index + 1}.{" "}
                <TypeAnimation
                  sequence={[point]}
                  speed={40}
                  wrapper="span"
                  cursor={false}
                />
              </p>
            ))}
          </div>
        </div>
        <SpeakButton speak={speak} />
      </div>
    </div>
  );
}
