import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartData } from '../../types/dashboard';
import { formatINR } from '../../lib/utils';

interface TrendChartProps {
  data: ChartData[];
  title: string;
  description?: string;
}

export function TrendChart({ data, title, description }: TrendChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN')}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={(value) => formatINR(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => [formatINR(value), 'Volume']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-IN')}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}