import React, { useState } from 'react';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { Transaction } from '../../types/payment';
import { SMSNotification } from '../../types/sms';
import { VolumeChart } from '../VolumeChart';
import { TransactionList } from '../transactions/TransactionList';
import { PaymentMethodBreakdown } from './PaymentMethodBreakdown';
import { Toast } from '../notifications/Toast';

interface PaymentDashboardProps {
  transactions: Transaction[];
  smsNotifications: SMSNotification[];
}

export function PaymentDashboard({
  transactions,
  smsNotifications
}: PaymentDashboardProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const totalVolume = transactions.reduce((sum, tx) => 
    tx.status === 'success' ? sum + tx.amount : sum, 0
  );

  const pendingAmount = transactions.reduce((sum, tx) => 
    tx.status === 'pending' ? sum + tx.amount : sum, 0
  );

  const successRate = transactions.length > 0
    ? (transactions.filter(tx => tx.status === 'success').length / transactions.length) * 100
    : 0;

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                ₹{totalVolume.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <IndianRupee className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Amount</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                ₹{pendingAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {successRate.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <ArrowUpRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Transaction Volume
          </h3>
          <VolumeChart data={[]} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Payment Methods
          </h3>
          <PaymentMethodBreakdown transactions={transactions} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Recent Transactions
        </h3>
        <TransactionList transactions={recentTransactions} />
      </div>

      {showToast && (
        <Toast
          type="success"
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}