import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { DataExport } from '../dashboard/DataExport';
import { BulkUpload } from '../dashboard/BulkUpload';

interface TransactionFiltersProps {
  onFilterChange?: (filters: any) => void;
}

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleFilterChange = () => {
    onFilterChange?.({
      dateRange,
      status,
      searchTerm
    });
  };

  const handleExport = (format: 'csv' | 'excel', dateRange: { start: string; end: string }) => {
    // In a real app, this would trigger an API call
    console.log('Exporting transactions:', { format, dateRange });
  };

  const handleBulkUpload = (file: File) => {
    // In a real app, this would handle the file upload
    console.log('Uploading transactions:', file);
  };

  const getPresetRanges = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    return [
      {
        label: 'Today',
        start: today.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0]
      },
      {
        label: 'Last 7 Days',
        start: new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      {
        label: 'This Month',
        start: startOfMonth.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0]
      },
      {
        label: 'Last Month',
        start: startOfLastMonth.toISOString().split('T')[0],
        end: endOfLastMonth.toISOString().split('T')[0]
      }
    ];
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="input-primary pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange();
            }}
          />
        </div>
        
        <div className="flex gap-4">
          <select 
            className="input-primary min-w-[150px]"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          
          <div className="relative">
            <button 
              className="btn-secondary"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </button>

            {showDatePicker && (
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 input-primary"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 input-primary"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {getPresetRanges().map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        setDateRange({
                          start: range.start,
                          end: range.end
                        });
                        handleFilterChange();
                      }}
                      className="px-3 py-2 text-sm font-medium rounded-md
                        bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                        hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <BulkUpload onUpload={handleBulkUpload} type="transactions" />
          <DataExport onExport={handleExport} />
        </div>
      </div>

      {(status !== 'all' || dateRange.start || dateRange.end || searchTerm) && (
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
            Active Filters:
            {status !== 'all' && <span className="ml-1 capitalize">{status}</span>}
            {dateRange.start && dateRange.end && (
              <span className="ml-1">
                {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
              </span>
            )}
            {searchTerm && <span className="ml-1">Search: {searchTerm}</span>}
          </span>
          <button
            onClick={() => {
              setStatus('all');
              setDateRange({ start: '', end: '' });
              setSearchTerm('');
              handleFilterChange();
            }}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}