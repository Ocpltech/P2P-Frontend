import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { Settlement } from '../../types/payment';
import { DateRangePicker } from '../ui/DateRangePicker';

interface PaymentSettlementsProps {
  settlements: Settlement[];
  onExport: (format: 'csv' | 'excel', dateRange: { start: string; end: string }) => void;
}

export function PaymentSettlements({ settlements, onExport }: PaymentSettlementsProps) {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredSettlements = settlements.filter(settlement => {
    if (!dateRange.start && !dateRange.end) return true;
    
    const settlementDate = new Date(settlement.createdAt);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    return (!startDate || settlementDate >= startDate) &&
           (!endDate || settlementDate <= endDate);
  });

  const totalAmount = filteredSettlements.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Settlements
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total: ₹{totalAmount.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowDatePicker(true)}
            className="btn-secondary"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
          <button
            onClick={() => onExport('csv', dateRange)}
            className="btn-secondary"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
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

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Settlement ID
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
              {filteredSettlements.map((settlement) => (
                <tr key={settlement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {settlement.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ₹{settlement.amount.toLocaleString('en-IN')}
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
  );
}