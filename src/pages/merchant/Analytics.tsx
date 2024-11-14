import React, { useState } from 'react';
import { AnalyticsOverview } from '../../components/analytics/AnalyticsOverview';
import { TrendChart } from '../../components/analytics/TrendChart';
import { TimeRangeSelector } from '../../components/dashboard/TimeRangeSelector';
import { mockAnalytics, mockChartData } from '../../lib/mockData';
import { TimeRange } from '../../types/dashboard';
import { PaymentMethodChart } from '../../components/analytics/PaymentMethodChart';
import { SuccessRateCard } from '../../components/analytics/SuccessRateCard';

export function MerchantAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Merchant Analytics</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track your payment performance and trends
          </p>
        </div>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>

      <AnalyticsOverview data={mockAnalytics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart
            data={mockChartData}
            title="Daily Transaction Volume"
            description="Your payment volume trends over time"
          />
        </div>
        <div className="lg:col-span-1">
          <SuccessRateCard
            successRate={98.5}
            trend={1.2}
            failureRate={1.5}
            processingTime={250}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentMethodChart />
        <TrendChart
          data={mockChartData.map(d => ({ ...d, value: d.value * 0.8 }))}
          title="Average Transaction Value"
          description="Trends in transaction value over time"
        />
      </div>
    </div>
  );
}