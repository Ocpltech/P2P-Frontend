import React, { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { Transaction } from '../../types/payment';
import { TransactionList } from '../../components/transactions/TransactionList';
import { DateRangePicker } from '../../components/ui/DateRangePicker';
import { DataExport } from '../../components/dashboard/DataExport';

const mockTransactions: Transaction[] = [
  {
    id: 'tx_1',
    amount: 85000.00,
    method: 'upi',
    status: 'success',
    commission: {
      total: 425,
      base: 360.17,
      gst: 64.83
    },
    merchantId: 'merch_1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:31:00Z',
    settlementStatus: 'pending'
  },
  // Add more mock transactions
];

export function TransactionHistory() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleExport = (format: 'csv' | 'excel', dateRange: { start: string; end: string }) => {
    // In a real app, this would trigger an API call
    console.log('Exporting transactions:', { format, dateRange });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.customerName?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDateRange = 
      (!dateRange.start || new Date(transaction.createdAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(transaction.createdAt) <= new Date(dateRange.end));
    
    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transaction History
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your payment transactions
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
          <DataExport onExport={handleExport} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="input-primary pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <select className="input-primary min-w-[150px]">
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
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

      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}