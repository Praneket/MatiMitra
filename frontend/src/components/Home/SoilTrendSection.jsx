// 📁 src/components/SoilTrendsSection.jsx

import React from "react";

const trends = [
  {
    title: "Moisture",
    description:
      "Tracks real-time soil moisture to prevent over or under watering, improving crop yield.",
    image: "/moisture.jpeg",
  },
  {
    title: "Soil pH",
    description:
      "Monitors acidity or alkalinity levels essential for optimal nutrient absorption.",
    image: "/PH.jpg",
  },
  {
    title: "Temperature",
    description:
      "Detects soil temperature to support ideal germination and plant growth.",
    image: "/temp.webp",
  },
  {
    title: "NPK",
    description:
      "Analyzes Nitrogen, Phosphorus, and Potassium levels to avoid fertilizer overuse.",
    image: "/npk.jpg",
  },
];

export default function SoilTrendSection() {
  return (
    <div className="py-5 bg-green-50 rounded-b-3xl shadow">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-10">
        Analyze Soil Trends
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        {trends.map((trend, index) => (
          <div
            key={index}
            className="text-center hover:shadow-lg transition duration-300 bg-white rounded-xl p-6 hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <img
              src={trend.image}
              alt={trend.title}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {trend.title}
            </h3>
            <p className="text-sm text-gray-600">{trend.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
