import React from 'react';
import { IndianRupee, Info } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';
import { commissionStructures } from '../../config/commissionConfig';
import { calculateCommission } from '../../utils/commissionCalculator';

interface CommissionDetailsProps {
  method: PaymentMethod;
  amount: number;
}

export function CommissionDetails({ method, amount }: CommissionDetailsProps) {
  const structure = commissionStructures[method];
  const commission = calculateCommission(amount, method);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
        Commission Breakdown
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Transaction Amount</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Commission ({structure.percentage}% + ₹{structure.fixedFee})
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{commission.base.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            GST ({structure.gst}%)
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{commission.gst.toFixed(2)}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-900 dark:text-white">You Receive</span>
            <span className="text-green-600 dark:text-green-400">
              ₹{commission.merchantReceives.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-xs text-blue-700 dark:text-blue-300">
        <Info className="w-4 h-4 mr-2 flex-shrink-0" />
        Settlement will be initiated within 24-48 hours of successful transaction
      </div>
    </div>
  );
}