import React, { useState } from 'react';
import { IndianRupee, Users, Building2, AlertTriangle } from 'lucide-react';
import { VolumeChart } from '../../components/VolumeChart';
import { TransactionList } from '../../components/transactions/TransactionList';
import { TimeRangeSelector } from '../../components/dashboard/TimeRangeSelector';
import { SMSNotificationMonitor } from '../../components/notifications/SMSNotificationMonitor';
import { mockTransactions, mockChartData } from '../../lib/mockData';
import { TimeRange } from '../../types/dashboard';

export function AdminOverview() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const stats = {
    totalVolume: mockTransactions.reduce((sum, tx) => 
      tx.status === 'success' ? sum + tx.amount : sum, 0
    ),
    activeMerchants: 45,
    activeAccounts: 12,
    pendingApprovals: 3
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                ₹{stats.totalVolume.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <IndianRupee className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Bank Accounts</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.activeAccounts}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Approvals</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.pendingApprovals}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Transaction Volume
            </h2>
            <VolumeChart data={mockChartData} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            SMS Notifications
          </h2>
          <SMSNotificationMonitor
            notifications={[]}
            onDismiss={() => {}}
            onPaymentConfirmed={() => {}}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Recent Transactions
        </h2>
        <TransactionList transactions={mockTransactions.slice(0, 5)} />
      </div>
    </div>
  );
}