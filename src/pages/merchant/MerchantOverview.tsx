import React, { useState } from 'react';
import { MetricsGrid } from '../../components/dashboard/MetricsGrid';
import { VolumeChart } from '../../components/VolumeChart';
import { TransactionList } from '../../components/transactions/TransactionList';
import { BankAccountCard } from '../../components/dashboard/BankAccountCard';
import { TimeRangeSelector } from '../../components/dashboard/TimeRangeSelector';
import { CreateTransactionModal } from '../../components/modals/CreateTransactionModal';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { mockAnalytics, mockTransactions, mockChartData, mockBankAccounts } from '../../lib/mockData';
import { TimeRange } from '../../types/dashboard';

export function MerchantOverview() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateTransaction = (data: any) => {
    console.log('Creating transaction:', data);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Merchant Dashboard</h1>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>

      <MetricsGrid analytics={mockAnalytics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VolumeChart data={mockChartData} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions 
            onCreateTransaction={() => setIsCreateModalOpen(true)}
            userType="merchant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockBankAccounts.slice(0, 2).map((account) => (
          <BankAccountCard key={account.id} account={account} />
        ))}
      </div>

      <TransactionList transactions={mockTransactions} />

      <CreateTransactionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTransaction}
      />
    </div>
  );
}