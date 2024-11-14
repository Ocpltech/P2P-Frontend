import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  className?: string;
}

export function DashboardCard({ title, value, icon: Icon, trend, className = '' }: DashboardCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
}