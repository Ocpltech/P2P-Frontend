import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';
import { commissionStructures } from '../../config/commissionConfig';
import { Toast } from '../notifications/Toast';

export function CommissionSettings() {
  const [settings, setSettings] = useState(commissionStructures);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving commission settings:', settings);
    setShowToast(true);
  };

  const handleChange = (
    method: PaymentMethod,
    field: keyof typeof commissionStructures.upi,
    value: number
  ) => {
    setSettings({
      ...settings,
      [method]: {
        ...settings[method],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Commission Settings
        </h2>
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {(Object.keys(settings) as PaymentMethod[]).map((method) => (
          <div
            key={method}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 uppercase">
              {method} Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Commission Percentage
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.01"
                    className="input-primary pr-12"
                    value={settings[method].percentage}
                    onChange={(e) => handleChange(method, 'percentage', parseFloat(e.target.value))}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fixed Fee
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    className="input-primary pl-7"
                    value={settings[method].fixedFee}
                    onChange={(e) => handleChange(method, 'fixedFee', parseFloat(e.target.value))}
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
                    value={settings[method].gst}
                    onChange={(e) => handleChange(method, 'gst', parseFloat(e.target.value))}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minimum Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    className="input-primary pl-7"
                    value={settings[method].minAmount}
                    onChange={(e) => handleChange(method, 'minAmount', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maximum Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    className="input-primary pl-7"
                    value={settings[method].maxAmount}
                    onChange={(e) => handleChange(method, 'maxAmount', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Changes to commission settings will affect all future transactions. Existing transactions will not be affected.
        </p>
      </div>

      {showToast && (
        <Toast
          type="success"
          message="Commission settings saved successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}