import React from "react";

// helper function to evaluate health status
const getStatus = (value, range) => {
  if (value < range.min)
    return { label: "Low", color: "bg-red-100 text-red-700" };
  if (value > range.max)
    return { label: "High", color: "bg-orange-100 text-orange-700" };
  return { label: "Optimal", color: "bg-green-100 text-green-700" };
};

// suggestions based on status
const getSuggestion = (key, status) => {
  const tips = {
    pH: {
      Low: "Soil is acidic. Add lime to increase pH.",
      High: "Soil is alkaline. Add organic matter like compost.",
      Optimal: "pH level is balanced.",
    },
    Moisture: {
      Low: "Soil is dry. Increase irrigation.",
      High: "Too much water. Improve drainage.",
      Optimal: "Moisture is at a good level.",
    },
    "Nitrogen (N)": {
      Low: "Add nitrogen-rich fertilizers like urea or compost.",
      High: "Too much nitrogen. Reduce nitrogen fertilizers.",
      Optimal: "Nitrogen is sufficient.",
    },
    "Phosphorus (P)": {
      Low: "Add phosphorus fertilizers like DAP.",
      High: "Excess phosphorus. Avoid P-based fertilizers.",
      Optimal: "Phosphorus is balanced.",
    },
    "Potassium (K)": {
      Low: "Add potassium fertilizers like MOP.",
      High: "Excess potassium. Reduce K-based fertilizers.",
      Optimal: "Potassium is sufficient.",
    },
    Temperature: {
      Low: "Soil is too cold. Consider mulching.",
      High: "Soil is too hot. Increase irrigation or shade.",
      Optimal: "Temperature is ideal.",
    },
  };

  return tips[key]?.[status] || "No suggestion available.";
};

export default function SoilHealth({ readings }) {
  const params = [
    { key: "pH", value: readings.pH, range: { min: 6, max: 7.5 }, unit: "" },
    {
      key: "Moisture",
      value: readings.moisture,
      range: { min: 30, max: 60 },
      unit: "%",
    },
    {
      key: "Nitrogen (N)",
      value: readings.nitrogen,
      range: { min: 20, max: 50 },
      unit: "mg/kg",
    },
    {
      key: "Phosphorus (P)",
      value: readings.phosphorus,
      range: { min: 15, max: 40 },
      unit: "mg/kg",
    },
    {
      key: "Potassium (K)",
      value: readings.potassium,
      range: { min: 20, max: 45 },
      unit: "mg/kg",
    },
    {
      key: "Temperature",
      value: readings.temperature,
      range: { min: 18, max: 30 },
      unit: "°C",
    },
  ];

  // overall health score
  const optimalCount = params.filter(
    (p) => getStatus(p.value, p.range).label === "Optimal"
  ).length;
  const overallHealth =
    optimalCount >= 5
      ? { label: "Healthy", color: "text-green-700 bg-green-100" }
      : optimalCount >= 3
      ? { label: "Moderate", color: "text-yellow-700 bg-yellow-100" }
      : { label: "Poor", color: "text-red-700 bg-red-100" };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Soil Health</h2>

      {/* Overall Health */}
      <div
        className={`text-center p-3 rounded-lg font-semibold mb-6 ${overallHealth.color}`}
      >
        Overall Soil Health: {overallHealth.label}
      </div>

      {/* Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {params.map((p) => {
          const status = getStatus(p.value, p.range);
          const suggestion = getSuggestion(p.key, status.label);
          return (
            <div
              key={p.key}
              className="p-4 border rounded-lg bg-gray-50 hover:shadow transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium text-gray-800">{p.key}</p>
                  <p className="text-sm text-gray-500">
                    {p.value} {p.unit}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-xs text-gray-600 italic">{suggestion}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}