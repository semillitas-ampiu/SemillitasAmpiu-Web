
import type { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import type { BarChartDataPoint } from '@/types';

interface Props {
  data: BarChartDataPoint[];
  loading: boolean;
}

const SalesBarChart: FC<Props> = ({ data, loading }) => {
  if (loading) {
    return <div className="text-white">Cargando datos...</div>;
  }
  if (!data || data.length === 0) {
    return <div className="text-white">No hay datos para mostrar.</div>;
  }
  return (
    <BarChart width={500} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="count" fill="#3b82f6" />
    </BarChart>
  );
};

export default SalesBarChart;
