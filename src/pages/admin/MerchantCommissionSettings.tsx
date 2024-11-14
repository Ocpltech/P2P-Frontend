import React, { useState } from 'react';
import { Save, AlertTriangle, IndianRupee, Percent, Search } from 'lucide-react';
import { PaymentMethod, MerchantCommission } from '../../types/commission';
import { Toast } from '../../components/notifications/Toast';
import { Dialog } from '../../components/ui/Dialog';

interface Merchant {
  id: string;
  name: string;
  email: string;
  businessType: string;
}

export function MerchantCommissionSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [showCommissionDialog, setShowCommissionDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mock merchants data
  const merchants: Merchant[] = [
    {
      id: 'merch_1',
      name: 'TechCorp India Ltd',
      email: 'accounts@techcorp.in',
      businessType: 'Technology'
    },
    {
      id: 'merch_2',
      name: 'Retail Solutions Pvt Ltd',
      email: 'finance@retailsolutions.in',
      businessType: 'Retail'
    }
  ];

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCommission = async (commission: MerchantCommission) => {
    try {
      // In a real app, this would make an API call
      console.log('Saving commission settings:', commission);
      setToastMessage('Commission settings saved successfully');
      setShowCommissionDialog(false);
    } catch (error) {
      setToastMessage('Failed to save commission settings');
    }
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Merchant Commission Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure custom commission rates for individual merchants
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchants..."
            className="input-primary pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMerchants.map((merchant) => (
          <div
            key={merchant.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {merchant.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {merchant.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Business Type</span>
                <span className="text-gray-900 dark:text-white">{merchant.businessType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Custom Rates</span>
                <span className="text-blue-600 dark:text-blue-400">Configured</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setSelectedMerchant(merchant);
                  setShowCommissionDialog(true);
                }}
                className="btn-primary w-full"
              >
                Configure Commission
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCommissionDialog && selectedMerchant && (
        <Dialog
          isOpen={showCommissionDialog}
          onClose={() => setShowCommissionDialog(false)}
          title={`Commission Settings - ${selectedMerchant.name}`}
        >
          <MerchantCommissionForm
            merchantId={selectedMerchant.id}
            onSubmit={handleSaveCommission}
            onCancel={() => setShowCommissionDialog(false)}
          />
        </Dialog>
      )}

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

interface MerchantCommissionFormProps {
  merchantId: string;
  onSubmit: (commission: MerchantCommission) => void;
  onCancel: () => void;
}

function MerchantCommissionForm({ merchantId, onSubmit, onCancel }: MerchantCommissionFormProps) {
  const [commission, setCommission] = useState<MerchantCommission>({
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
      volumeBasedDiscounts: [
        { minVolume: 1000000, discountPercentage: 10 },
        { minVolume: 5000000, discountPercentage: 20 }
      ]
    },
    effectiveFrom: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...commission,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Percent className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fixed Fee (₹)
              </label>
              <input
                type="number"
                step="0.5"
                className="mt-1 input-primary"
                value={commission.commissions[method].fixedFee}
                onChange={(e) => handleMethodChange(method, 'fixedFee', parseFloat(e.target.value))}
                disabled={!commission.commissions[method].enabled}
              />
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
                  <Percent className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Volume-based Discounts
        </h3>

        <div className="space-y-4">
          {commission.specialRates.volumeBasedDiscounts.map((discount, index) => (
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
                    const newDiscounts = [...commission.specialRates.volumeBasedDiscounts];
                    newDiscounts[index].minVolume = parseFloat(e.target.value);
                    setCommission({
                      ...commission,
                      specialRates: {
                        ...commission.specialRates,
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
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.01"
                    className="input-primary pr-12"
                    value={discount.discountPercentage}
                    onChange={(e) => {
                      const newDiscounts = [...commission.specialRates.volumeBasedDiscounts];
                      newDiscounts[index].discountPercentage = parseFloat(e.target.value);
                      setCommission({
                        ...commission,
                        specialRates: {
                          ...commission.specialRates,
                          volumeBasedDiscounts: newDiscounts
                        }
                      });
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Changes will take effect from the next billing cycle. Existing transactions will not be affected.
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Commission Settings
        </button>
      </div>
    </form>
  );
}