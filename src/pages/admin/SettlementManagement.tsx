import React, { useState } from 'react';
import { Calendar, Download, Filter, RefreshCw, AlertTriangle, IndianRupee } from 'lucide-react';
import { Settlement } from '../../types/payment';
import { DateRangePicker } from '../../components/ui/DateRangePicker';
import { Toast } from '../../components/notifications/Toast';
import { formatINR } from '../../lib/utils';

export function SettlementManagement() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - replace with API calls in production
  const settlements: Settlement[] = [
    {
      id: 'stl_1',
      merchantId: 'merch_1',
      amount: 1250000,
      transactionIds: ['tx_1', 'tx_2'],
      status: 'pending',
      bankAccount: {
        accountNumber: '****1234',
        ifscCode: 'HDFC0001234',
        bankName: 'HDFC Bank',
        accountHolder: 'TechCorp India Ltd'
      },
      createdAt: '2024-03-15T10:30:00Z',
      updatedAt: '2024-03-15T10:30:00Z'
    }
  ];

  const stats = {
    totalPending: settlements.filter(s => s.status === 'pending')
      .reduce((sum, s) => sum + s.amount, 0),
    totalProcessed: settlements.filter(s => s.status === 'processed')
      .reduce((sum, s) => sum + s.amount, 0),
    totalFailed: settlements.filter(s => s.status === 'failed')
      .reduce((sum, s) => sum + s.amount, 0)
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // In a real app, this would fetch fresh data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setToastMessage('Settlements refreshed');
      setShowToast(true);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    // In a real app, this would trigger a CSV/Excel download
    setToastMessage('Settlement report exported');
    setShowToast(true);
  };

  const handleProcessSettlements = async () => {
    try {
      // In a real app, this would trigger settlement processing
      setToastMessage('Settlements processed successfully');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to process settlements');
      setShowToast(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settlement Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Process and monitor merchant settlements
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleProcessSettlements}
            className="btn-primary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Process Settlements
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Settlements</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {formatINR(stats.totalPending)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Processed Today</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {formatINR(stats.totalProcessed)}
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
              <p className="text-sm text-gray-500 dark:text-gray-400">Failed Settlements</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {formatINR(stats.totalFailed)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDatePicker(true)}
                className="btn-secondary"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </button>
              <button
                onClick={handleRefresh}
                className="btn-secondary"
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
            <select className="input-primary min-w-[150px]">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processed">Processed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {showDatePicker && (
            <DateRangePicker
              start={dateRange.start}
              end={dateRange.end}
              onApply={(start, end) => {
                setDateRange({ start, end });
                setShowDatePicker(false);
              }}
              onCancel={() => setShowDatePicker(false)}
            />
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Settlement ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Bank Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Processed At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {settlements.map((settlement) => (
                  <tr key={settlement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {settlement.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {settlement.bankAccount.accountHolder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatINR(settlement.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        settlement.status === 'processed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : settlement.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {settlement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {settlement.bankAccount.bankName} - {settlement.bankAccount.accountNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(settlement.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {settlement.processedAt
                        ? new Date(settlement.processedAt).toLocaleString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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