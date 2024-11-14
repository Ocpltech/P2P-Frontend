import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Settlement } from '../../types/payment';

interface SettlementDetailsProps {
  settlement: Settlement;
}

export function SettlementDetails({ settlement }: SettlementDetailsProps) {
  const getStatusIcon = (status: Settlement['status']) => {
    switch (status) {
      case 'processed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Settlement Details
        </h3>
        <div className="flex items-center">
          {getStatusIcon(settlement.status)}
          <span className="ml-2 text-sm font-medium capitalize">
            {settlement.status}
          </span>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-4">
        <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Settlement ID
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white">
            {settlement.id}
          </dd>
        </div>

        <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Amount
          </dt>
          <dd className="text-sm font-medium text-gray-900 dark:text-white">
            ₹{settlement.amount.toLocaleString('en-IN')}
          </dd>
        </div>

        <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Bank Account
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white">
            {settlement.bankAccount.bankName} - {settlement.bankAccount.accountNumber}
          </dd>
        </div>

        <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Created At
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white">
            {new Date(settlement.createdAt).toLocaleString('en-IN')}
          </dd>
        </div>

        {settlement.processedAt && (
          <div className="flex justify-between py-3">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Processed At
            </dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {new Date(settlement.processedAt).toLocaleString('en-IN')}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}