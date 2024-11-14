import React from 'react';
import { CheckCircle2, XCircle, Clock, TrendingUp } from 'lucide-react';

interface SuccessRateCardProps {
  successRate: number;
  trend: number;
  failureRate: number;
  processingTime: number;
}

export function SuccessRateCard({
  successRate,
  trend,
  failureRate,
  processingTime
}: SuccessRateCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transaction Success Rate
        </h3>
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {successRate}%
            </span>
            {trend > 0 && (
              <span className="ml-2 text-sm text-green-600">+{trend}%</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Failure Rate</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {failureRate}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Processing Time</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {processingTime}ms
          </span>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last 24 hours
            </span>
            <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${successRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}