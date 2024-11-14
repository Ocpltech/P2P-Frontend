import React, { useState } from 'react';
import { Save, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { PaymentMethod, MerchantCommission } from '../../types/commission';
import { Toast } from '../notifications/Toast';

interface MerchantCommissionFormProps {
  merchantId: string;
  initialData?: MerchantCommission;
  onSubmit: (data: MerchantCommission) => void;
}

export function MerchantCommissionForm({
  merchantId,
  initialData,
  onSubmit
}: MerchantCommissionFormProps) {
  const [commission, setCommission] = useState<MerchantCommission>(
    initialData || {
      merchantId,
      commissions: {
        upi: {
          percentage: 0.5,
          fixedFee: 0,
          gst: 18,
          minAmount: 1,
          maxAmount: 100000,
          enabled: true
        },
        imps: {
          percentage: 0.3,
          fixedFee: 5,
          gst: 18,
          minAmount: 1,
          maxAmount: 500000,
          enabled: true
        },
        neft: {
          percentage: 0.2,
          fixedFee: 2.5,
          gst: 18,
          minAmount: 1,
          maxAmount: Infinity,
          enabled: true
        },
        rtgs: {
          percentage: 0.1,
          fixedFee: 20,
          gst: 18,
          minAmount: 200000,
          maxAmount: Infinity,
          enabled: true
        }
      },
      specialRates: {
        volumeBasedDiscounts: [],
        customCategories: []
      },
      effectiveFrom: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin'
    }
  );

  const [showToast, setShowToast] = useState(false);

  const handleMethodChange = (
    method: PaymentMethod,
    field: string,
    value: number | boolean
  ) => {
    setCommission({
      ...commission,
      commissions: {
        ...commission.commissions,
        [method]: {
          ...commission.commissions[method],
          [field]: value
        }
      }
    });
  };

  const addVolumeDiscount = () => {
    setCommission({
      ...commission,
      specialRates: {
        ...commission.specialRates!,
        volumeBasedDiscounts: [
          ...commission.specialRates!.volumeBasedDiscounts,
          { minVolume: 0, discountPercentage: 0 }
        ]
      }
    });
  };

  const removeVolumeDiscount = (index: number) => {
    const newDiscounts = [...commission.specialRates!.volumeBasedDiscounts];
    newDiscounts.splice(index, 1);
    setCommission({
      ...commission,
      specialRates: {
        ...commission.specialRates!,
        volumeBasedDiscounts: newDiscounts
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...commission,
      updatedAt: new Date().toISOString()
    });
    setShowToast(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Commission Settings */}
      {(Object.keys(commission.commissions) as PaymentMethod[]).map((method) => (
        <div
          key={method}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase">
              {method} Settings
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={commission.commissions[method].enabled}
                onChange={(e) => handleMethodChange(method, 'enabled', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                {commission.commissions[method].enabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>

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
                  value={commission.commissions[method].percentage}
                  onChange={(e) => handleMethodChange(method, 'percentage', parseFloat(e.target.value))}
                  disabled={!commission.commissions[method].enabled}
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
                  value={commission.commissions[method].fixedFee}
                  onChange={(e) => handleMethodChange(method, 'fixedFee', parseFloat(e.target.value))}
                  disabled={!commission.commissions[method].enabled}
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
                  value={commission.commissions[method].gst}
                  onChange={(e) => handleMethodChange(method, 'gst', parseFloat(e.target.value))}
                  disabled={!commission.commissions[method].enabled}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Volume-based Discounts */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Volume-based Discounts
          </h3>
          <button
            type="button"
            onClick={addVolumeDiscount}
            className="btn-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Discount Tier
          </button>
        </div>

        <div className="space-y-4">
          {commission.specialRates?.volumeBasedDiscounts.map((discount, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minimum Volume (₹)
                </label>
                <input
                  type="number"
                  className="mt-1 input-primary"
                  value={discount.minVolume}
                  onChange={(e) => {
                    const newDiscounts = [...commission.specialRates!.volumeBasedDiscounts];
                    newDiscounts[index].minVolume = parseFloat(e.target.value);
                    setCommission({
                      ...commission,
                      specialRates: {
                        ...commission.specialRates!,
                        volumeBasedDiscounts: newDiscounts
                      }
                    });
                  }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 input-primary"
                  value={discount.discountPercentage}
                  onChange={(e) => {
                    const newDiscounts = [...commission.specialRates!.volumeBasedDiscounts];
                    newDiscounts[index].discountPercentage = parseFloat(e.target.value);
                    setCommission({
                      ...commission,
                      specialRates: {
                        ...commission.specialRates!,
                        volumeBasedDiscounts: newDiscounts
                      }
                    });
                  }}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeVolumeDiscount(index)}
                  className="btn-secondary text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Effective Date */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Effective From
        </label>
        <input
          type="datetime-local"
          className="mt-1 input-primary"
          value={commission.effectiveFrom.slice(0, 16)}
          onChange={(e) => setCommission({
            ...commission,
            effectiveFrom: new Date(e.target.value).toISOString()
          })}
        />
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Changes will take effect from the specified date. Existing transactions will not be affected.
        </p>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Commission Settings
        </button>
      </div>

      {showToast && (
        <Toast
          type="success"
          message="Commission settings saved successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
}