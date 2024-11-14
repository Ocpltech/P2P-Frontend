import React, { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Toast } from '../notifications/Toast';

interface TransactionExportProps {
  onExport: (format: 'csv' | 'excel', dateRange: { start: string; end: string }) => void;
}

export function TransactionExport({ onExport }: TransactionExportProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [format, setFormat] = useState<'csv' | 'excel'>('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showToast, setShowToast] = useState(false);

  const handleExport = () => {
    onExport(format, dateRange);
    setShowDialog(false);
    setShowToast(true);
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
        onClose={() => setShowDialog(false)}
        title="Export Transactions"
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

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDialog(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="btn-primary"
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