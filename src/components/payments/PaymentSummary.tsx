import React from 'react';
import { IndianRupee, Clock } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';

interface PaymentSummaryProps {
  amount: number;
  method: PaymentMethod;
  fees: {
    base: number;
    gst: number;
    total: number;
  };
  estimatedTime?: string;
}

export function PaymentSummary({
  amount,
  method,
  fees,
  estimatedTime
}: PaymentSummaryProps) {
  const totalAmount = amount + fees.total;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          ₹{amount.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Processing Fee</span>
          <span className="text-sm text-gray-900 dark:text-white">
            ₹{fees.base.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">GST (18%)</span>
          <span className="text-sm text-gray-900 dark:text-white">
            ₹{fees.gst.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Total</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{totalAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {estimatedTime && (
        <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Estimated time: {estimatedTime}
          </span>
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400">
        By proceeding, you agree to our terms and conditions
      </div>
    </div>
  );
}