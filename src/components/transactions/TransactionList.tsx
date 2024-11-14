import React from 'react';
import { Transaction } from '../../types/dashboard';
import { StatusBadge } from '../dashboard/StatusBadge';
import { TransactionFilters } from './TransactionFilters';
import { MoreVertical, Eye, RefreshCw, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../../lib/utils';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/merchant/transactions/${id}`);
  };

  const handleRefund = (id: string) => {
    navigate(`/merchant/refunds/new?transactionId=${id}`);
  };

  const handleDispute = (id: string) => {
    navigate(`/merchant/disputes/new?transactionId=${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            View all
          </button>
        </div>
        
        <TransactionFilters />

        <div className="mt-6 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Client</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Bank Account</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                    <th className="relative px-3 py-3.5">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <StatusBadge status={transaction.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {formatINR(transaction.amount)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {transaction.clientName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {transaction.bankAccount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {new Date(transaction.date).toLocaleString('en-IN')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => handleViewDetails(transaction.id)}
                            className="text-gray-400 hover:text-gray-500"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {transaction.status === 'success' && (
                            <button
                              onClick={() => handleRefund(transaction.id)}
                              className="text-gray-400 hover:text-gray-500"
                              title="Refund"
                            >
                              <RefreshCw className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDispute(transaction.id)}
                            className="text-gray-400 hover:text-gray-500"
                            title="Raise Dispute"
                          >
                            <AlertTriangle className="w-5 h-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}