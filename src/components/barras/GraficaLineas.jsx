import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Sep", p1: 20, p2: 28 },
  { name: "Oct", p1: 15, p2: 32 },
  { name: "Nov", p1: 25, p2: 38 },
  { name: "Dec", p1: 30, p2: 45 },
  { name: "Jan", p1: 18, p2: 40 },
  { name: "Feb", p1: 28, p2: 60 },
  { name: "Mar", p1: 35, p2: 55 },
  { name: "Apr", p1: 22, p2: 58 },
  { name: "May", p1: 40, p2: 50 },
  { name: "Jun", p1: 25, p2: 35 },
  { name: "Jul", p1: 32, p2: 40 },
  { name: "Aug", p1: 45, p2: 47 },
];

export default function SalesLineChart() {
  return (
    <LineChart width={500} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="p1" stroke="#3b82f6" strokeWidth={3} />
      <Line type="monotone" dataKey="p2" stroke="#10b981" strokeWidth={3} />
    </LineChart>
  );
}
