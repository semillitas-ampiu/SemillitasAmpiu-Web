export default function StatsCard({ title, value, icon, trend, trendColor }) {
  return (
    <div className="bg-gray rounded-xl shadow p-5 flex items-center space-x-4">
      <div className="text-3x1">{icon}</div>
      <div className="flex-1">
        <p className="text-blue-500">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
      <div className={`font-semibold ${trendColor}`}>{trend}</div>
    </div>
  );
}
