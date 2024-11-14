import React from 'react';
import { ArrowUpRight, IndianRupee, Users, Wallet, Clock, AlertTriangle } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';
import { AnalyticsSummary } from '../../types/dashboard';

interface MetricsGridProps {
  analytics: AnalyticsSummary;
}

const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export function MetricsGrid({ analytics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <DashboardCard
        title="Total Volume"
        value={formatINR(analytics.totalVolume)}
        icon={IndianRupee}
        trend={analytics.monthlyGrowth}
      />
      <DashboardCard
        title="Success Rate"
        value={`${analytics.successRate}%`}
        icon={ArrowUpRight}
        trend={2.1}
      />
      <DashboardCard
        title="Active Clients"
        value={analytics.activeClients}
        icon={Users}
        trend={5.3}
      />
      <DashboardCard
        title="Total Transactions"
        value={analytics.totalTransactions.toLocaleString('en-IN')}
        icon={Wallet}
        trend={8.2}
      />
      <DashboardCard
        title="Avg. Processing Time"
        value={`${analytics.processingSpeed}ms`}
        icon={Clock}
        trend={-12.5}
      />
      <DashboardCard
        title="Failure Rate"
        value={`${analytics.failureRate}%`}
        icon={AlertTriangle}
        trend={-1.2}
      />
    </div>
  );
}