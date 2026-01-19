import type { FC } from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

import type { BarChartDataPoint } from '@/types';

/**
 * Datos de ejemplo para el gráfico de barras
 * TODO: Estos datos deberían venir de la API
 */
const data: BarChartDataPoint[] = [
  { day: 'M', sales: 50, revenue: 20 },
  { day: 'T', sales: 75, revenue: 25 },
  { day: 'W', sales: 60, revenue: 18 },
  { day: 'T2', sales: 70, revenue: 22 },
  { day: 'F', sales: 30, revenue: 15 },
  { day: 'S', sales: 45, revenue: 25 },
  { day: 'S2', sales: 65, revenue: 30 },
];

/**
 * Gráfico de barras para mostrar ventas y revenue
 * Utiliza recharts para la visualización
 */
const SalesBarChart: FC = () => {
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
};

export default SalesBarChart;
