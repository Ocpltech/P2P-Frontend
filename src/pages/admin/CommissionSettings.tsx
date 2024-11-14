import React, { useState } from 'react';
import { Save, AlertTriangle, IndianRupee, Percent, Settings } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';
import { Toast } from '../../components/notifications/Toast';

interface CommissionRule {
  merchantId?: string;
  method: PaymentMethod;
  percentage: number;
  fixedFee: number;
  gst: number;
  minAmount: number;
  maxAmount: number;
  enabled: boolean;
}

export function CommissionSettings() {
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>([
    {
      method: 'upi',
      percentage: 0.5,
      fixedFee: 0,
      gst: 18,
      minAmount: 1,
      maxAmount: 100000,
      enabled: true
    },
    {
      method: 'imps',
      percentage: 0.3,
      fixedFee: 5,
      gst: 18,
      minAmount: 1,
      maxAmount: 500000,
      enabled: true
    },
    {
      method: 'neft',
      percentage: 0.2,
      fixedFee: 2.5,
      gst: 18,
      minAmount: 1,
      maxAmount: Infinity,
      enabled: true
    },
    {
      method: 'rtgs',
      percentage: 0.1,
      fixedFee: 20,
      gst: 18,
      minAmount: 200000,
      maxAmount: Infinity,
      enabled: true
    }
  ]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRuleChange = (index: number, field: keyof CommissionRule, value: any) => {
    const updatedRules = [...commissionRules];
    updatedRules[index] = {
      ...updatedRules[index],
      [field]: value
    };
    setCommissionRules(updatedRules);
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    setToastMessage('Commission settings saved successfully');
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Commission Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure commission rates for different payment methods
          </p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {commissionRules.map((rule, index) => (
          <div
            key={rule.method}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  {rule.method === 'upi' ? (
                    <IndianRupee className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white uppercase">
                  {rule.method} Commission
                </h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={rule.enabled}
                  onChange={(e) => handleRuleChange(index, 'enabled', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Commission Percentage
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.01"
                    className="input-primary pr-12"
                    value={rule.percentage}
                    onChange={(e) => handleRuleChange(index, 'percentage', parseFloat(e.target.value))}
                    disabled={!rule.enabled}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fixed Fee (₹)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.5"
                    className="input-primary"
                    value={rule.fixedFee}
                    onChange={(e) => handleRuleChange(index, 'fixedFee', parseFloat(e.target.value))}
                    disabled={!rule.enabled}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GST Rate
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    className="input-primary pr-12"
                    value={rule.gst}
                    onChange={(e) => handleRuleChange(index, 'gst', parseFloat(e.target.value))}
                    disabled={!rule.enabled}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minimum Amount (₹)
                </label>
                <input
                  type="number"
                  className="mt-1 input-primary"
                  value={rule.minAmount}
                  onChange={(e) => handleRuleChange(index, 'minAmount', parseFloat(e.target.value))}
                  disabled={!rule.enabled}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maximum Amount (₹)
                </label>
                <input
                  type="number"
                  className="mt-1 input-primary"
                  value={rule.maxAmount === Infinity ? '' : rule.maxAmount}
                  placeholder="No limit"
                  onChange={(e) => handleRuleChange(index, 'maxAmount', e.target.value ? parseFloat(e.target.value) : Infinity)}
                  disabled={!rule.enabled}
                />
              </div>
            </div>

            {rule.enabled && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Example Calculation
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  For a transaction of ₹10,000:
                  <br />
                  Commission: ₹{((rule.percentage / 100) * 10000 + rule.fixedFee).toFixed(2)}
                  <br />
                  GST: ₹{(((rule.percentage / 100) * 10000 + rule.fixedFee) * (rule.gst / 100)).toFixed(2)}
                  <br />
                  Total: ₹{((rule.percentage / 100) * 10000 + rule.fixedFee * (1 + rule.gst / 100)).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <div className="text-sm text-yellow-700 dark:text-yellow-300">
          <p className="font-medium">Important Notes:</p>
          <ul className="mt-1 list-disc list-inside">
            <li>Changes will affect all future transactions</li>
            <li>Existing transactions will not be affected</li>
            <li>GST is calculated on the commission amount</li>
          </ul>
        </div>
      </div>

      {showToast && (
        <Toast
          type="success"
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}