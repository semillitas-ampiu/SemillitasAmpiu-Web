import type { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
