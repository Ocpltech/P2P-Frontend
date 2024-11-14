import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Download, ExternalLink } from 'lucide-react';
import { StatusBadge } from '../../components/dashboard/StatusBadge';
import { mockTransactions } from '../../lib/mockData';
import { formatINR } from '../../lib/utils';

export function TransactionDetails() {
  const { id } = useParams();
  const transaction = mockTransactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Transaction not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="btn-secondary" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Transaction Details
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              ID: {transaction.id}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="btn-secondary">
            <Copy className="w-4 h-4 mr-2" />
            Copy ID
          </button>
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Transaction Information
            </h2>
            <dl className="grid grid-cols-1 gap-4">
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  <StatusBadge status={transaction.status} />
                </dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatINR(transaction.amount)}
                </dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {new Date(transaction.date).toLocaleString('en-IN')}
                </dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {transaction.clientName}
                </dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bank Account</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {transaction.bankAccount}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Details
              </h2>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Payment Method
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    Credit Card
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Card Number
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    **** **** **** 1234
                  </dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Authorization Code
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    AUTH123456
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Additional Information
              </h2>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    IP Address
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    192.168.1.1
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Device
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    Desktop - Chrome
                  </dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    Mumbai, India
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}