import React from "react";
import { TypeAnimation } from "react-type-animation";
import SpeakButton from "./SpeakButton";

export default function AIRecommendation({ message, speak }) {
  return (
    <>
      <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 my-10 shadow-md flex justify-between">
        <div>
          <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
            Farming Tip(AI Powered)
          </h2>
          <TypeAnimation
            sequence={[message]}
            speed={40}
            wrapper="p"
            cursor={true}
            className="text-gray-800 text-base font-medium leading-relaxed"
          />
        </div>
        <SpeakButton speak={speak} />
      </div>
    </>
  );
}
