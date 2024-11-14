import React, { useState } from 'react';
import { AnalyticsOverview } from '../../components/analytics/AnalyticsOverview';
import { TrendChart } from '../../components/analytics/TrendChart';
import { TimeRangeSelector } from '../../components/dashboard/TimeRangeSelector';
import { mockAnalytics, mockChartData } from '../../lib/mockData';
import { TimeRange } from '../../types/dashboard';

export function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor your payment gateway performance
          </p>
        </div>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>

      <AnalyticsOverview data={mockAnalytics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart
          data={mockChartData}
          title="Transaction Volume Trend"
          description="Daily transaction volume over time"
        />
        <TrendChart
          data={mockChartData.map(d => ({ ...d, value: d.value * (Math.random() * 0.5 + 0.5) }))}
          title="Success Rate Trend"
          description="Transaction success rate over time"
        />
      </div>
    </div>
  );
}