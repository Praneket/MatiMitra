import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]; // Colors for segments

const SoilNutrientsDonuts = ({ npk = {}, microNutrients = {} }) => {
  // Convert objects into array format for Recharts
  const macroData = Object.entries(npk).map(([key, value], index) => ({
    name: key,
    value,
    color: COLORS[index % COLORS.length],
  }));

  const microData = Object.entries(microNutrients).map(
    ([key, value], index) => ({
      name: key,
      value,
      color: COLORS[index % COLORS.length],
    })
  );

  const renderDonut = (title, data) => (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={320} height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-lg font-semibold mt-2">{title}</div>
    </div>
  );

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mt-5">
          Soil Nutrient Analysis
        </h3>
        <div
          className="flex flex-col lg:flex-row md:flex-row justify-center items-center  rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 
             hover:shadow-xl 
             transition-all duration-300 ease-in-out"
        >
          {macroData.length > 0 &&
            renderDonut("Macronutrients (N, P, K)", macroData)}
          {microData.length > 0 &&
            renderDonut("Micronutrients (Zn, Fe, Mn, Cu)", microData)}
        </div>
      </div>
    </>
  );
};

export default SoilNutrientsDonuts;