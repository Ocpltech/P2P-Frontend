import React from 'react';
import { TimeRange } from '../../types/dashboard';

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const ranges: { label: string; value: TimeRange }[] = [
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
  { label: '1y', value: '1y' },
];

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex space-x-2">
      {ranges.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`
            px-3 py-1 text-sm font-medium rounded-md
            ${selected === value
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}