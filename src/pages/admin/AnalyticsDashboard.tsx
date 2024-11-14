import React, { useState } from 'react';
import { BarChart3, TrendingUp, IndianRupee, Users } from 'lucide-react';
import { VolumeChart } from '../../components/VolumeChart';
import { TimeRangeSelector } from '../../components/dashboard/TimeRangeSelector';
import { PaymentMethodChart } from '../../components/analytics/PaymentMethodChart';
import { SuccessRateCard } from '../../components/analytics/SuccessRateCard';
import { mockAnalytics, mockChartData } from '../../lib/mockData';
import { TimeRange } from '../../types/dashboard';
import { formatINR } from '../../lib/utils';

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const stats = {
    totalVolume: mockAnalytics.totalVolume,
    totalTransactions: mockAnalytics.totalTransactions,
    successRate: mockAnalytics.successRate,
    monthlyGrowth: mockAnalytics.monthlyGrowth,
    activeMerchants: mockAnalytics.activeClients
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor payment performance and trends
          </p>
        </div>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {formatINR(stats.totalVolume)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <IndianRupee className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          {stats.monthlyGrowth && (
            <div className="mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                +{stats.monthlyGrowth}% vs last month
              </span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.successRate}%
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalTransactions.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Merchants</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.activeMerchants}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Transaction Volume Trend
            </h2>
            <VolumeChart data={mockChartData} />
          </div>
        </div>

        <div>
          <SuccessRateCard
            successRate={stats.successRate}
            trend={2.5}
            failureRate={100 - stats.successRate}
            processingTime={250}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Payment Method Distribution
          </h2>
          <PaymentMethodChart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Settlement Analytics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Settlement Time</p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">24.5 hrs</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Settlement Success Rate</p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">99.8%</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Settlements</p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formatINR(2500000)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Settled Today</p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formatINR(15000000)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}