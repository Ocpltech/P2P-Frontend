import React, { useState } from 'react';
import { Calendar, Download, Filter, IndianRupee, PieChart, ArrowUpRight } from 'lucide-react';
import { DateRangePicker } from '../../components/ui/DateRangePicker';
import { Toast } from '../../components/notifications/Toast';
import { formatINR } from '../../lib/utils';
import { PaymentMethod } from '../../types/payment';

interface CommissionSummary {
  totalCommission: number;
  totalGST: number;
  netCommission: number;
  byMethod: Record<PaymentMethod, {
    volume: number;
    commission: number;
    gst: number;
  }>;
  byMerchant: {
    merchantId: string;
    merchantName: string;
    commission: number;
    gst: number;
    volume: number;
  }[];
}

export function CommissionReports() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Mock data - replace with API calls in production
  const commissionData: CommissionSummary = {
    totalCommission: 250000,
    totalGST: 45000,
    netCommission: 205000,
    byMethod: {
      upi: {
        volume: 5000000,
        commission: 100000,
        gst: 18000
      },
      imps: {
        volume: 3000000,
        commission: 75000,
        gst: 13500
      },
      neft: {
        volume: 2000000,
        commission: 50000,
        gst: 9000
      },
      rtgs: {
        volume: 1000000,
        commission: 25000,
        gst: 4500
      }
    },
    byMerchant: [
      {
        merchantId: 'merch_1',
        merchantName: 'TechCorp India Ltd',
        commission: 100000,
        gst: 18000,
        volume: 5000000
      },
      {
        merchantId: 'merch_2',
        merchantName: 'Retail Solutions',
        commission: 75000,
        gst: 13500,
        volume: 3000000
      }
    ]
  };

  const handleExport = () => {
    // In a real app, this would trigger a CSV/Excel download
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Commission Reports</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and analyze commission earnings
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
          <button
            onClick={handleExport}
            className="btn-secondary"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Commission</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {formatINR(commissionData.totalCommission)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <IndianRupee className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total GST</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {formatINR(commissionData.totalGST)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <ArrowUpRight className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Net Commission</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {formatINR(commissionData.netCommission)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Commission by Payment Method
          </h2>
          <div className="space-y-4">
            {(Object.entries(commissionData.byMethod) as [PaymentMethod, any][]).map(([method, data]) => (
              <div key={method} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white uppercase">
                    {method}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Volume: {formatINR(data.volume)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatINR(data.commission)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    GST: {formatINR(data.gst)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Merchants by Commission
          </h2>
          <div className="space-y-4">
            {commissionData.byMerchant.map((merchant) => (
              <div key={merchant.merchantId} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {merchant.merchantName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Volume: {formatINR(merchant.volume)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatINR(merchant.commission)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    GST: {formatINR(merchant.gst)}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

      {showToast && (
        <Toast
          type="success"
          message="Commission report exported successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}