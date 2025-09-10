import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { GiFertilizerBag } from "react-icons/gi";
import { FiRefreshCw } from "react-icons/fi";

const getRecommendations = (ph, npk) => {
  let recommendations = [];

  if (ph < 5.5) {
    recommendations.push({
      title: "Lime Treatment",
      description:
        "Apply agricultural lime to raise soil pH and reduce acidity.",
      type: "Soil Amendment",
    });
  } else if (ph > 7.5) {
    recommendations.push({
      title: "Sulfur-Based Amendment",
      description:
        "Use elemental sulfur or gypsum to slightly reduce alkalinity.",
      type: "Soil Amendment",
    });
  }

  if (npk < 50) {
    recommendations.push({
      title: "Nitrogen-Rich Organic Fertilizer",
      description:
        "Apply composted manure or green manure for long-term fertility.",
      type: "Organic",
    });
  } else if (npk >= 50 && npk < 80) {
    recommendations.push({
      title: "Balanced NPK Fertilizer (10:10:10)",
      description: "Use evenly mixed fertilizer for stable growth.",
      type: "Regenerative",
    });
  } else {
    recommendations.push({
      title: "Low-NPK Compost",
      description: "Maintain soil health using vermicompost or leaf mulch.",
      type: "Organic",
    });
  }

  return recommendations;
};

const FertilizerRecommendation = () => {
  const [soilData, setSoilData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLatestSoil = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "sensor_logs"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const snapshot = await getDocs(q);
      const latest = snapshot.docs[0]?.data();

      if (latest) {
        setSoilData(latest);
        setRecommendations(getRecommendations(latest.ph, latest.npk));
        setLastUpdated(new Date(latest.timestamp).toLocaleString());
      }
    } catch (err) {
      console.error("Error fetching soil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestSoil();
  }, []);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md mt-6 border border-green-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2">
          <GiFertilizerBag className="text-3xl" />
          Smart Fertilizer Recommendations
        </h2>
        <button
          onClick={fetchLatestSoil}
          className="text-green-700 hover:text-green-900 flex items-center gap-1 border border-green-200 px-3 py-1 rounded hover:bg-green-50 transition text-sm"
        >
          <FiRefreshCw className="animate-spin-once" />
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Loading recommendations...
        </p>
      ) : soilData ? (
        <>
          <p className="text-gray-700 mb-4">
            Based on your recent soil scan:
            <br />
            <span className="text-green-700 font-medium flex gap-4 mt-2">
              <span>
                🌱 pH: <strong>{soilData.ph}</strong>
              </span>
              <span>
                🧪 NPK: <strong>{soilData.npk}</strong>
              </span>
            </span>
            {lastUpdated && (
              <span className="block text-xs text-gray-500 mt-1">
                Last Updated: {lastUpdated}
              </span>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-green-200 bg-gradient-to-br from-green-50 to-white rounded-xl shadow hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2 text-green-800 mb-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <GiFertilizerBag className="text-xl" />
                  </div>
                  <h3 className="text-md font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
                <span
                  className={`inline-block mt-3 text-xs px-2 py-1 rounded ${
                    item.type === "Organic"
                      ? "bg-green-100 text-green-700"
                      : item.type === "Regenerative"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.type} Fertilizer
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-red-500">No soil data available.</p>
      )}
    </div>
  );
};

export default FertilizerRecommendation;
