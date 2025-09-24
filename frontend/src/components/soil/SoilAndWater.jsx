import React from "react";
import { GiPlantRoots, GiWaterDrop } from "react-icons/gi";
import { FaHandHoldingWater } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";

const SoilAndWater = () => {
  return (
    <>
      <section className="bg-green-50 py-12 px-6 md:px-16 rounded-xl ">
        <h2 className="text-3xl font-extrabold text-center text-green-800 mb-10">
          Soil & Water Intelligence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Soil Health */}
          <div className="bg-white border-l-4 border-green-500 shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <GiPlantRoots className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-700">
                Soil Health Report
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              🌱 <strong>Loamy soil</strong> with excellent fertility and
              structure.
              <br />
              ✅ pH: 6.5 | Moisture: 35% | NPK: 12-8-10
              <br />
              🦠 High organic content ensures strong root health and microbial
              activity.
            </p>
            <ul className="mt-4 text-sm text-gray-600 list-disc pl-5">
              <li>Recommended compost: 1 kg/acre</li>
              <li>Use of biofertilizers suggested</li>
              <li>Next scan due: 10 days</li>
            </ul>
          </div>

          {/* Water Usage */}
          <div className="bg-white border-l-4 border-blue-500 shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <MdOutlineWaterDrop className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-blue-700">
                Smart Water Usage
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              🚰 Weekly irrigation: <strong>130L</strong> <br />
              🌦 Rainfall: Moderate | Quality: Good
              <br />
              💧 Drip system active with smart scheduling.
            </p>
            <ul className="mt-4 text-sm text-gray-600 list-disc pl-5">
              <li>Use early morning watering to reduce evaporation</li>
              <li>AI alerts when soil moisture drops below 25%</li>
              <li>Save water by 22% using MatiMitra planner</li>
            </ul>
          </div>
        </div>

        {/* PMKSY & Government Integration */}
        <div className="bg-gradient-to-r from-green-100 to-white mt-10 p-6 rounded-xl shadow-inner border border-green-200">
          <div className="flex items-center gap-4 mb-3">
            <FaHandHoldingWater className="text-blue-700 text-2xl" />
            <h3 className="text-xl font-bold text-green-800">
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
            <li>
              Farmers eligible for PMKSY can sync their MatiMitra dashboard
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default SoilAndWater;
