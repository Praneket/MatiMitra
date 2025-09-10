// SoilHealthCard.jsx
import React from "react";
import { GiDroplets, GiChemicalDrop, GiFertilizerBag } from "react-icons/gi";
import { MdCalendarToday } from "react-icons/md";

const SoilHealthCard = () => {
  const soil = {
    moisture: 34, // in %
    pH: 6.5,
    npk: "12:8:10",
    lastScan: "18 July 2025",
  };

  const getMoistureStatus = (value) =>
    value >= 30 && value <= 50 ? "Good" : value < 30 ? "Low" : "High";

  const getPhStatus = (value) =>
    value >= 6.0 && value <= 7.0 ? "Optimal" : "Unbalanced";

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto h-full">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Current Soil Health Status
      </h2>

      <div className="grid grid-cols-2 gap-10 py-9 h-44">
        {/* Moisture */}
        <div className="flex items-center gap-4">
          <div className="text-3xl text-blue-500">
            <GiDroplets />
          </div>
          <div>
            <p className="text-sm text-gray-600">Moisture</p>
            <p className="font-semibold text-lg">
              {soil.moisture}%{" "}
              <span
                className={`ml-2 text-sm font-medium ${
                  getMoistureStatus(soil.moisture) === "Good"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({getMoistureStatus(soil.moisture)})
              </span>
            </p>
          </div>
        </div>

        {/* pH */}
        <div className="flex items-center gap-4">
          <div className="text-3xl text-yellow-500">
            <GiChemicalDrop />
          </div>
          <div>
            <p className="text-sm text-gray-600">Soil pH</p>
            <p className="font-semibold text-lg">
              {soil.pH}{" "}
              <span
                className={`ml-2 text-sm font-medium ${
                  getPhStatus(soil.pH) === "Optimal"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({getPhStatus(soil.pH)})
              </span>
            </p>
          </div>
        </div>

        {/* NPK */}
        <div className="flex items-center gap-4 mt-6">
          <div className="text-3xl text-purple-500">
            <GiFertilizerBag />
          </div>
          <div>
            <p className="text-sm text-gray-600">NPK Ratio</p>
            <p className="font-semibold text-lg">{soil.npk}</p>
          </div>
        </div>

        {/* Last Scan */}
        <div className="flex items-center gap-4 mt-6">
          <div className="text-3xl text-gray-500">
            <MdCalendarToday />
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Soil Scan</p>
            <p className="font-semibold text-lg">{soil.lastScan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthCard;
