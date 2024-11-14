import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  start: string;
  end: string;
  onApply: (start: string, end: string) => void;
  onCancel: () => void;
}

export function DateRangePicker({
  start,
  end,
  onApply,
  onCancel
}: DateRangePickerProps) {
  const [localStart, setLocalStart] = React.useState(start);
  const [localEnd, setLocalEnd] = React.useState(end);

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Select Date Range
        </h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            className="mt-1 input-primary"
            value={localStart}
            onChange={(e) => setLocalStart(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            type="date"
            className="mt-1 input-primary"
            value={localEnd}
            onChange={(e) => setLocalEnd(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {getPresetRanges().map((range) => (
          <button
            key={range.label}
            onClick={() => {
              setLocalStart(range.start);
              setLocalEnd(range.end);
            }}
            className="px-3 py-2 text-sm font-medium rounded-md
              bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
              hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={() => onApply(localStart, localEnd)}
          className="btn-primary"
        >
          Apply
        </button>
      </div>
    </div>
  );
}