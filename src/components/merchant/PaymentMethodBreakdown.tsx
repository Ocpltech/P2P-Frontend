import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from '../../types/payment';

interface PaymentMethodBreakdownProps {
  transactions: Transaction[];
}

export function PaymentMethodBreakdown({ transactions }: PaymentMethodBreakdownProps) {
  const methodColors = {
    upi: '#3b82f6',
    imps: '#10b981',
    neft: '#f59e0b',
    rtgs: '#6366f1'
  };

  const methodData = transactions.reduce((acc, tx) => {
    if (tx.status === 'success') {
      acc[tx.method] = (acc[tx.method] || 0) + tx.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(methodData).map(([method, amount]) => ({
    name: method.toUpperCase(),
    value: amount,
    color: methodColors[method as keyof typeof methodColors]
  }));

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [
              `₹${value.toLocaleString('en-IN')} (${((value / totalAmount) * 100).toFixed(1)}%)`,
              'Amount'
            ]}
          />
          <Legend
            formatter={(value: string) => value}
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}