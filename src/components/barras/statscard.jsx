export default function StatsCard({ title, value, icon, trend, trendColor }) {
  return (
    <div className="bg-gray rounded-xl shadow p-5 flex items-center space-x-4 border-indigo-600 border">
      <div className="text-2xl text-indigo-600">{icon}</div>
      <div className="flex-1">
        <p className="text-white text-2xl">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className={`font-semibold ${trendColor}`}>{trend}</div>
    </div>
  );
}
