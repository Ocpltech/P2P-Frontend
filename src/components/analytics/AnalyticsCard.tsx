import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatINR } from '../../lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  trend?: number;
  icon: LucideIcon;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export function AnalyticsCard({ 
  title, 
  value, 
  trend, 
  icon: Icon,
  isCurrency,
  isPercentage 
}: AnalyticsCardProps) {
  const formattedValue = isCurrency 
    ? formatINR(Number(value))
    : isPercentage 
    ? `${value}%`
    : value;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {formattedValue}
            </p>
          </div>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className="text-sm font-medium">
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}