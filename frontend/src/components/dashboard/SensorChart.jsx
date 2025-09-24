import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SensorChart({ title, dataPoints, color = "#3b82f6", unit = "" }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📈 {title} Trend
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* ✅ Format X-axis labels */}
          <XAxis
            dataKey="time"
            tickFormatter={(timeVal) => {
              if (!timeVal) return "NA";
              const dateObj = new Date(timeVal);
              if (isNaN(dateObj)) return "NA";
              return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            }}
          />

          <YAxis unit={unit} />

          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const dateObj = new Date(label);
                const formattedLabel = isNaN(dateObj) ? label : dateObj.toLocaleString();
                return (
                  <div className="bg-white shadow-md p-3 rounded border text-sm text-gray-800">
                    <p className="font-semibold">{title}</p>
                    <p>
                      {formattedLabel}: <span className="font-medium">{payload[0].value}</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
