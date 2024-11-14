import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const mockData = [
  { name: 'UPI', value: 45, color: '#3b82f6' },
  { name: 'Credit Card', value: 25, color: '#10b981' },
  { name: 'Debit Card', value: 15, color: '#f59e0b' },
  { name: 'Net Banking', value: 10, color: '#6366f1' },
  { name: 'Wallets', value: 5, color: '#ec4899' }
];

export function PaymentMethodChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment Methods
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Distribution of payment methods used
          </p>
        </div>
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          Total: ₹15,00,000
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {mockData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number, name: string) => [
                `${value}%`,
                name
              ]}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value: string, entry: any) => (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {value} ({entry.payload.value}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {mockData.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ₹{(1500000 * (item.value / 100)).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}