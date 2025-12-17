import type { FC } from 'react';

import type { StatsCardProps } from '@/types';

/**
 * Tarjeta de estadísticas para el dashboard
 * Muestra un título, valor, ícono y opcionalmente una tendencia
 */
const StatsCard: FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendColor = 'text-gray-500' 
}) => {
  return (
    <div className="bg-gray rounded-xl shadow p-5 flex items-center space-x-4 border-gray-700 border">
      <div className="text-2xl text-indigo-600">{icon}</div>
      <div className="flex-1">
        <p className="font-bold text-white text-2xl">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      {trend && <div className={`font-semibold ${trendColor}`}>{trend}</div>}
    </div>
  );
};

export default StatsCard;
