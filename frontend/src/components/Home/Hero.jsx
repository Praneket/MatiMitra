// 📁 src/components/Hero.jsx
import React from "react";
import { GiRootTip } from "react-icons/gi";

const Hero = () => {
  return (
    <div
      className="min-h-[calc(100vh-64px)] bg-cover bg-center bg-no-repeat text-white flex items-center justify-center px-6"
      style={{
        backgroundImage: "url('/rootSense.webp')",
      }}
    >
      <div className="bg-black/50 p-8 rounded-xl text-center max-w-2xl">
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md cursor-pointer hover:text-green-800 transition duration-300"
        >
          <span className="flex">
            <GiRootTip /> MatiMitra
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 italic">
          Voice of Soil — Empowering Small & Marginal Farmers
        </h2>
        <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-100">
          Monitor your soil health in real-time. Get AI-powered recommendations
          for crop rotation, irrigation, and sustainable farming — all in your
          language.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
