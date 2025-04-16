// components/Chart.js
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

export default function HiringTrendsChart({ darkMode }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke={darkMode ? "#ccc" : "#333"} />
        <YAxis stroke={darkMode ? "#ccc" : "#333"} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="investors"
          stroke="#4F46E5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

HiringTrendsChart.propTypes = {
  darkMode: PropTypes.bool,
};
