import React, { useState } from 'react';
import { Download, FileSpreadsheet, Calendar } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Toast } from '../notifications/Toast';

interface DataExportProps {
  onExport: (format: 'csv' | 'excel', dateRange: { start: string; end: string }) => void;
}

export function DataExport({ onExport }: DataExportProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [format, setFormat] = useState<'csv' | 'excel'>('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showToast, setShowToast] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const handleExport = () => {
    // Simulate export progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setExportProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onExport(format, dateRange);
        setShowDialog(false);
        setExportProgress(0);
        setShowToast(true);
      }
    }, 300);
  };

  const getPresetRanges = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    return [
      {
        label: 'This Month',
        start: startOfMonth.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0]
      },
      {
        label: 'Last Month',
        start: startOfLastMonth.toISOString().split('T')[0],
        end: endOfLastMonth.toISOString().split('T')[0]
      },
      {
        label: 'Last 7 Days',
        start: new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      }
    ];
  };

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="btn-secondary"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </button>

      <Dialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setExportProgress(0);
        }}
        title="Export Data"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Export Format
            </label>
            <select
              className="mt-1 input-primary"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'csv' | 'excel')}
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Date Range
            </label>
            <div className="grid grid-cols-3 gap-2">
              {getPresetRanges().map((range) => (
                <button
                  key={range.label}
                  onClick={() => setDateRange({
                    start: range.start,
                    end: range.end
                  })}
                  className="px-3 py-2 text-sm font-medium rounded-md
                    bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                    hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

          {exportProgress > 0 && exportProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Preparing export...</span>
                <span>{exportProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDialog(false);
                setExportProgress(0);
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="btn-primary"
              disabled={!dateRange.start || !dateRange.end || exportProgress > 0}
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </Dialog>

      {showToast && (
        <Toast
          type="success"
          message="Export started. You'll be notified when it's ready."
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}