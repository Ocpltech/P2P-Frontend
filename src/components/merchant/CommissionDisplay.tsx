import React from 'react';
import { IndianRupee, Info, TrendingDown } from 'lucide-react';
import { PaymentMethod, MerchantCommission } from '../../types/commission';
import { calculateMerchantCommission } from '../../utils/merchantCommissionCalculator';

interface CommissionDisplayProps {
  merchantCommission: MerchantCommission;
  method: PaymentMethod;
  amount: number;
  monthlyVolume: number;
}

export function CommissionDisplay({
  merchantCommission,
  method,
  amount,
  monthlyVolume
}: CommissionDisplayProps) {
  const commission = calculateMerchantCommission(
    amount,
    method,
    merchantCommission,
    monthlyVolume
  );

  const methodSettings = merchantCommission.commissions[method];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Commission Breakdown
        </h3>
        {commission.appliedPercentage < methodSettings.percentage && (
          <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
            <TrendingDown className="w-4 h-4 mr-1" />
            Volume Discount Applied
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Transaction Amount</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Commission ({commission.appliedPercentage}% + ₹{methodSettings.fixedFee})
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{commission.base.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            GST ({methodSettings.gst}%)
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
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Effective Rate: {commission.effectiveRate.toFixed(2)}%
          </div>
        </div>
      </div>

      {monthlyVolume > 0 && (
        <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-xs text-blue-700 dark:text-blue-300">
          <Info className="w-4 h-4 mr-2 flex-shrink-0" />
          Monthly Volume: ₹{monthlyVolume.toLocaleString('en-IN')}
        </div>
      )}
    </div>
  );
}