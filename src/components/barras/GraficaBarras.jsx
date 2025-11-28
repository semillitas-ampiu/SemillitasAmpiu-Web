import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { day: "M", sales: 50, revenue: 20 },
  { day: "T", sales: 75, revenue: 25 },
  { day: "W", sales: 60, revenue: 18 },
  { day: "T", sales: 70, revenue: 22 },
  { day: "F", sales: 30, revenue: 15 },
  { day: "S", sales: 45, revenue: 25 },
  { day: "S", sales: 65, revenue: 30 },
];

export default function SalesBarChart() {
  return (
    <BarChart width={500} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="sales" fill="#3b82f6" />
      <Bar dataKey="revenue" fill="#10b981" />
    </BarChart>
  );
}
