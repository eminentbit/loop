import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const data = [
  { month: "Jan", investors: 10 },
  { month: "Feb", investors: 15 },
  { month: "Mar", investors: 20 },
  { month: "Apr", investors: 18 },
  { month: "May", investors: 25 },
  { month: "Jun", investors: 30 },
];

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`rounded-md px-4 py-2 shadow-md text-sm ${
          darkMode
            ? "bg-gray-800 text-white border border-gray-600"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
      >
        <p className="font-semibold">{label}</p>
        <p>{`Investors: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default function HiringTrendsChart({ darkMode }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#444" : "#e5e7eb"} // darker grid lines in dark mode
        />
        <XAxis dataKey="month" stroke={darkMode ? "#ccc" : "#333"} />
        <YAxis stroke={darkMode ? "#ccc" : "#333"} />
        <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
        <Line
          type="monotone"
          dataKey="investors"
          stroke="#4F46E5"
          strokeWidth={2}
          dot={{ r: 4, stroke: "#4F46E5", fill: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

HiringTrendsChart.propTypes = {
  darkMode: PropTypes.bool,
};
