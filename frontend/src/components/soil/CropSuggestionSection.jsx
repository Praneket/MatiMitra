import React from "react";

const currentSoil = {
  type: "Loamy Soil",
  ph: "6.5",
  npk: "12:8:10",
};

const cropSuggestions = [
  {
    name: "Wheat",
    season: "Rabi",
    conditions: "Loamy soil, pH 6.0–7.5",
    image: "/crops/Wheat.jpg",
  },
  {
    name: "Sugarcane",
    season: "Kharif",
    conditions: "Loamy to clayey soil, high NPK",
    image: "/crops/Sugarcane.jpg",
  },
  {
    name: "Pulses",
    season: "Rabi / Kharif",
    conditions: "Neutral pH, Loamy or sandy-loam",
    image: "/crops/pulses.jpeg",
  },
  {
    name: "Cotton",
    season: "Kharif",
    conditions: "Black or Loamy soil, pH 6.0–7.5",
    image: "/crops/cotton.webp",
  },
];

const CropSuggestionSection = () => {
  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Crop Suggestions Based on Current Soil Status
      </h2>

      {/* Soil Status */}
      <div className="flex flex-wrap gap-4 mb-4">
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          Soil Type: {currentSoil.type}
        </span>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          pH: {currentSoil.ph}
        </span>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          NPK: {currentSoil.npk}
        </span>
      </div>

      {/* Suggested Crops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {cropSuggestions.map((crop, idx) => (
          <div
            key={idx}
            className="bg-green-50 rounded-lg p-4 shadow hover:shadow-md transition-transform hover:scale-[1.02]"
            data-aos="fade-up"
          >
            <div className="w-full h-[180px] overflow-hidden rounded-md">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-md font-semibold text-green-700 text-center">
              {crop.name}
            </h3>
            <p className="text-xs text-gray-600 text-center">
              <strong>Season:</strong> {crop.season}
            </p>
            <p className="text-xs text-gray-600 text-center mt-1">
              <strong>Ideal:</strong> {crop.conditions}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropSuggestionSection;
