import React from 'react';
import { BarChart3, TrendingUp, Users, CreditCard, Clock, AlertTriangle } from 'lucide-react';
import { AnalyticsCard } from './AnalyticsCard';
import { AnalyticsSummary } from '../../types/dashboard';

interface AnalyticsOverviewProps {
  data: AnalyticsSummary;
}

export function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnalyticsCard
        title="Total Volume"
        value={data.totalVolume}
        trend={data.monthlyGrowth}
        icon={BarChart3}
        isCurrency
      />
      <AnalyticsCard
        title="Success Rate"
        value={data.successRate}
        trend={2.5}
        icon={TrendingUp}
        isPercentage
      />
      <AnalyticsCard
        title="Active Clients"
        value={data.activeClients}
        trend={5.2}
        icon={Users}
      />
      <AnalyticsCard
        title="Total Transactions"
        value={data.totalTransactions}
        trend={3.8}
        icon={CreditCard}
      />
      <AnalyticsCard
        title="Avg. Processing Time"
        value={`${data.processingSpeed}ms`}
        trend={-15.3}
        icon={Clock}
      />
      <AnalyticsCard
        title="Failure Rate"
        value={data.failureRate}
        trend={-0.8}
        icon={AlertTriangle}
        isPercentage
      />
    </div>
  );
}