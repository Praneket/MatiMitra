import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import SoilHealthCard from "./SoilHealthcard";

const COLORS = {
  high: "#22C55E", // Green
  medium: "#FACC15", // Yellow
  low: "#EF4444", // Red
};

const sampleData = {
  totalSamples: "9.89L",
  year: "2025-26",
  nutrients: {
    N: [
      { name: "Low", value: 78, color: COLORS.low },
      { name: "Medium", value: 20, color: COLORS.medium },
      { name: "High", value: 2, color: COLORS.high },
    ],
    P: [
      { name: "High", value: 31, color: COLORS.high },
      { name: "Medium", value: 54, color: COLORS.medium },
      { name: "Low", value: 15, color: COLORS.low },
    ],
    K: [
      { name: "High", value: 27, color: COLORS.high },
      { name: "Medium", value: 63, color: COLORS.medium },
      { name: "Low", value: 9, color: COLORS.low },
    ],
  },
};

const NutrientDonut = ({ title, data }) => (
  <div className="flex flex-col items-center">
    <ResponsiveContainer width={120} height={120}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={35}
          outerRadius={55}
          paddingAngle={2}
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="text-lg font-semibold">{title}</div>
  </div>
);

const NutrientAnalysisSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-white rounded-lg shadow p-6 my-6">
      {/* LEFT: Nutrient Analysis */}
      <div className="lg:w-2/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Nutrient Analysis
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Insights into soil and nutrient concentrations across regions to
          understand the nutrient landscape and its impact on soil health.
        </p>
        <div className="text-green-600 font-bold text-2xl mb-4">
          {sampleData.totalSamples}
          <span className="text-sm text-gray-500 ml-2 font-normal">
            Samples Analyzed in {sampleData.year}
          </span>
        </div>

        <div className="flex justify-between gap-6 overflow-x-auto">
          {Object.entries(sampleData.nutrients).map(([key, value]) => (
            <NutrientDonut key={key} title={key} data={value} />
          ))}
        </div>

        <div className="mt-6 flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> High
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Medium
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> Low
          </div>
        </div>
      </div>

      {/* RIGHT: Training Cards */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        <SoilHealthCard />
      </div>
    </div>
  );
};

export default NutrientAnalysisSection;
