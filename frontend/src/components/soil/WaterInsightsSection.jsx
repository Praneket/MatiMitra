import React from "react";
import { Line } from "react-chartjs-2";
import { BsDropletHalf, BsAlarm } from "react-icons/bs";
import { FaHandHoldingWater } from "react-icons/fa";

const WaterInsightsSection = ({ moistureLevel = 24 }) => {
  const moistureThreshold = 25;
  const isAlert = moistureLevel < moistureThreshold;

  // Sample Monthly Water Usage Data
  const waterUsageData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Water Used (litres)",
        data: [320, 290, 310, 300],
        fill: false,
        backgroundColor: "#10B981",
        borderColor: "#10B981",
        tension: 0.3,
      },
    ],
  };

  return (
    <section className="bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          💧 Water Insights
        </h2>

        {/* Current Moisture Alert */}
        <div className="flex items-center gap-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong>Current Moisture Level:</strong>{" "}
            <span
              className={
                isAlert
                  ? "text-red-600 font-semibold"
                  : "text-green-700 font-semibold"
              }
            >
              {moistureLevel}%
            </span>
            {isAlert && (
              <span className="ml-2 text-red-500 flex items-center gap-1">
                <BsAlarm /> Alert: Moisture below 25%
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Monthly Usage Graph */}
      <div className="mb-6">
        <h3 className="text-green-700 font-semibold mb-2">
          Monthly Water Usage
        </h3>
        <div data-aos="fade-up" className="h-52 w-full">
          <Line
            data={waterUsageData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* Irrigation Types */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div data-aos="fade-up" className="border p-4 rounded-lg bg-green-50">
          <h4 className=" text-2xl font-bold text-green-700 mb-1">
            💦 Drip Irrigation
          </h4>
          <p className="text-sm text-gray-600">
            Conserves water by targeting plant roots.
          </p>
          <img className="rounded-md mt-2 w-full h-[250px]" src="./drip2.jpg" />
        </div>
        <div data-aos="fade-up" className="border p-4 rounded-lg bg-green-50">
          <h4 className="font-bold text-2xl text-green-700 mb-1">
            🚿 Sprinklers
          </h4>
          <p className="text-sm text-gray-600">
            Suitable for wide-area irrigation and regular moisture.
          </p>
          <img
            className="rounded-md mt-2 w-full h-[250px]"
            src="./sprinkler.jpg"
          />
        </div>
      </div>

      {/* PMKSY Support */}
      <div
        data-aos="fade-up"
        className="mt-6 p-4 border rounded bg-yellow-50 border-yellow-200"
      >
        <div className="flex items-center gap-4 mb-3">
          <FaHandHoldingWater className="text-yellow-700 text-2xl" />
          <h3 className="text-xl font-bold text-yellow-700 mb-1">
            Supporting PMKSY - Har Khet Ko Pani 🇮🇳
          </h3>
        </div>
        <p className="text-gray-700 text-sm">
          MatiMitra is aligned with{" "}
          <strong>PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)</strong>
          by enabling real-time moisture tracking, optimizing irrigation, and
          empowering farmers with water-efficient technologies.
        </p>
        <ul className="mt-3 list-disc pl-6 text-gray-600 text-sm">
          <li>Custom irrigation scheduler based on local weather + soil</li>
          <li>Detects leaks or excess watering instantly</li>
          <li>Farmers eligible for PMKSY can sync their MatiMitra dashboard</li>
        </ul>
      </div>
    </section>
  );
};

export default WaterInsightsSection;
