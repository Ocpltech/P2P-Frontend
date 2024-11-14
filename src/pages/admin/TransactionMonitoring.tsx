import React, { useState } from 'react';
import { TransactionList } from '../../components/transactions/TransactionList';
import { TransactionFilters } from '../../components/transactions/TransactionFilters';
import { mockTransactions } from '../../lib/mockData';
import { BarChart3, Download, Filter } from 'lucide-react';

export function TransactionMonitoring() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: { start: '', end: '' },
    searchTerm: ''
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would fetch filtered transactions here
  };

  const handleExport = () => {
    // In a real app, this would trigger a CSV/Excel download
    console.log('Exporting transactions...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction Monitoring</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor and manage all payment transactions
          </p>
        </div>
        
        <div className="flex space-x-4">
          <button className="btn-secondary">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </button>
          <button className="btn-secondary" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <TransactionFilters onFilterChange={handleFilterChange} />
          <TransactionList 
            transactions={mockTransactions}
            selectedTransactions={selectedTransactions}
            onSelectionChange={setSelectedTransactions}
          />
        </div>
      </div>
    </div>
  );
}