import React, { useState } from 'react';
import { Building2, AlertTriangle } from 'lucide-react';

interface BankAccountFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  type: 'admin' | 'merchant';
}

const SUPPORTED_BANKS = [
  { name: 'State Bank of India', upiHandles: ['@sbi', '@oksbi'], ifscPrefix: 'SBIN' },
  { name: 'HDFC Bank', upiHandles: ['@hdfcbank', '@payzapp'], ifscPrefix: 'HDFC' },
  { name: 'ICICI Bank', upiHandles: ['@icici', '@ibl'], ifscPrefix: 'ICIC' },
  { name: 'Axis Bank', upiHandles: ['@axisbank', '@axl'], ifscPrefix: 'UTIB' },
  { name: 'Yes Bank', upiHandles: ['@yesbank', '@ybl'], ifscPrefix: 'YESB' },
  { name: 'Kotak Mahindra Bank', upiHandles: ['@kotak', '@kmbl'], ifscPrefix: 'KKBK' },
  { name: 'Punjab National Bank', upiHandles: ['@pnb', '@pnbinb'], ifscPrefix: 'PUNB' },
  { name: 'Bank of Baroda', upiHandles: ['@barodampay', '@bob'], ifscPrefix: 'BARB' },
  { name: 'IDBI Bank', upiHandles: ['@idbi', '@ibkl'], ifscPrefix: 'IBKL' },
  { name: 'Union Bank of India', upiHandles: ['@unionbank', '@uboi'], ifscPrefix: 'UBIN' }
];

const UPI_PROVIDERS = [
  '@paytm',
  '@gpay',
  '@phonepe',
  '@apl',
  '@ybl',
  '@okhdfcbank',
  '@okicici',
  '@okaxis'
];

export function BankAccountForm({ onSubmit, initialData, type }: BankAccountFormProps) {
  const [formData, setFormData] = useState({
    accountNumber: initialData?.accountNumber || '',
    confirmAccountNumber: initialData?.accountNumber || '',
    ifscCode: initialData?.ifscCode || '',
    accountName: initialData?.accountName || '',
    bankName: initialData?.bankName || SUPPORTED_BANKS[0].name,
    accountType: initialData?.accountType || 'savings',
    branchName: initialData?.branchName || '',
    swiftCode: initialData?.swiftCode || '',
    routingEnabled: initialData?.routingEnabled || false,
    upiEnabled: initialData?.upiEnabled || false,
    vpa: {
      username: initialData?.vpa?.username || '',
      provider: initialData?.vpa?.provider || '@paytm',
      customProvider: initialData?.vpa?.customProvider || '',
      useCustomProvider: initialData?.vpa?.useCustomProvider || false
    },
    limits: {
      dailyLimit: initialData?.limits?.dailyLimit || '',
      perTransactionLimit: initialData?.limits?.perTransactionLimit || '',
      monthlyLimit: initialData?.limits?.monthlyLimit || '',
      upiDailyLimit: initialData?.limits?.upiDailyLimit || '',
      upiPerTransactionLimit: initialData?.limits?.upiPerTransactionLimit || ''
    },
    remarks: initialData?.remarks || ''
  });

  const [selectedBank, setSelectedBank] = useState(SUPPORTED_BANKS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.accountNumber = 'Account numbers do not match';
    }

    if (formData.upiEnabled) {
      if (!formData.vpa.username) {
        newErrors.vpa = 'UPI username is required';
      } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.vpa.username)) {
        newErrors.vpa = 'Invalid UPI username format';
      }

      if (formData.vpa.useCustomProvider && !formData.vpa.customProvider) {
        newErrors.customProvider = 'Custom UPI provider is required';
      }
    }

    if (formData.limits.dailyLimit && parseInt(formData.limits.perTransactionLimit) > parseInt(formData.limits.dailyLimit)) {
      newErrors.perTransactionLimit = 'Per transaction limit cannot exceed daily limit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const vpaString = formData.upiEnabled
      ? `${formData.vpa.username}${formData.vpa.useCustomProvider ? formData.vpa.customProvider : formData.vpa.provider}`
      : '';

    onSubmit({
      ...formData,
      vpaString
    });
  };

  const handleBankChange = (bankName: string) => {
    const bank = SUPPORTED_BANKS.find(b => b.name === bankName);
    if (bank) {
      setSelectedBank(bank);
      setFormData({
        ...formData,
        bankName: bank.name
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          {initialData ? 'Edit Bank Account' : 'Add New Bank Account'}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bank Name
          </label>
          <select
            required
            className="mt-1 input-primary"
            value={formData.bankName}
            onChange={(e) => handleBankChange(e.target.value)}
          >
            {SUPPORTED_BANKS.map(bank => (
              <option key={bank.name} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Account Type
          </label>
          <select
            required
            className="mt-1 input-primary"
            value={formData.accountType}
            onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
          >
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Account Number
          </label>
          <input
            type="text"
            required
            className={`mt-1 input-primary ${errors.accountNumber ? 'border-red-500' : ''}`}
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          />
          {errors.accountNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Account Number
          </label>
          <input
            type="text"
            required
            className={`mt-1 input-primary ${errors.accountNumber ? 'border-red-500' : ''}`}
            value={formData.confirmAccountNumber}
            onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            IFSC Code
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 text-sm">
              {selectedBank.ifscPrefix}
            </span>
            <input
              type="text"
              required
              className="flex-1 input-primary rounded-l-none"
              value={formData.ifscCode}
              onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
              placeholder="0001234"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Account Holder Name
          </label>
          <input
            type="text"
            required
            className="mt-1 input-primary"
            value={formData.accountName}
            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.upiEnabled}
                onChange={(e) => setFormData({ ...formData, upiEnabled: e.target.checked })}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Enable UPI for this account
              </span>
            </label>
          </div>
        </div>

        {formData.upiEnabled && (
          <>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                UPI ID / VPA
              </label>
              <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    className={`input-primary w-full ${errors.vpa ? 'border-red-500' : ''}`}
                    placeholder="Enter UPI username"
                    value={formData.vpa.username}
                    onChange={(e) => setFormData({
                      ...formData,
                      vpa: { ...formData.vpa, username: e.target.value }
                    })}
                  />
                  {errors.vpa && (
                    <p className="mt-1 text-sm text-red-600">{errors.vpa}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    {!formData.vpa.useCustomProvider ? (
                      <select
                        className="input-primary flex-1"
                        value={formData.vpa.provider}
                        onChange={(e) => setFormData({
                          ...formData,
                          vpa: { ...formData.vpa, provider: e.target.value }
                        })}
                      >
                        {UPI_PROVIDERS.map(provider => (
                          <option key={provider} value={provider}>
                            {provider}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className={`input-primary flex-1 ${errors.customProvider ? 'border-red-500' : ''}`}
                        placeholder="Enter custom UPI provider"
                        value={formData.vpa.customProvider}
                        onChange={(e) => setFormData({
                          ...formData,
                          vpa: { ...formData.vpa, customProvider: e.target.value }
                        })}
                      />
                    )}
                  </div>
                  {errors.customProvider && (
                    <p className="mt-1 text-sm text-red-600">{errors.customProvider}</p>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.vpa.useCustomProvider}
                    onChange={(e) => setFormData({
                      ...formData,
                      vpa: { ...formData.vpa, useCustomProvider: e.target.checked }
                    })}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Use custom UPI provider
                  </span>
                </label>
              </div>
            </div>
          </>
        )}

        <div className="sm:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Transaction Limits
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Daily Transaction Limit (₹)
              </label>
              <input
                type="number"
                required
                className="mt-1 input-primary"
                value={formData.limits.dailyLimit}
                onChange={(e) => setFormData({
                  ...formData,
                  limits: { ...formData.limits, dailyLimit: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Per Transaction Limit (₹)
              </label>
              <input
                type="number"
                required
                className={`mt-1 input-primary ${errors.perTransactionLimit ? 'border-red-500' : ''}`}
                value={formData.limits.perTransactionLimit}
                onChange={(e) => setFormData({
                  ...formData,
                  limits: { ...formData.limits, perTransactionLimit: e.target.value }
                })}
              />
              {errors.perTransactionLimit && (
                <p className="mt-1 text-sm text-red-600">{errors.perTransactionLimit}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Monthly Transaction Limit (₹)
              </label>
              <input
                type="number"
                required
                className="mt-1 input-primary"
                value={formData.limits.monthlyLimit}
                onChange={(e) => setFormData({
                  ...formData,
                  limits: { ...formData.limits, monthlyLimit: e.target.value }
                })}
              />
            </div>

            {formData.upiEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    UPI Daily Limit (₹)
                  </label>
                  <input
                    type="number"
                    required
                    className="mt-1 input-primary"
                    value={formData.limits.upiDailyLimit}
                    onChange={(e) => setFormData({
                      ...formData,
                      limits: { ...formData.limits, upiDailyLimit: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    UPI Per Transaction Limit (₹)
                  </label>
                  <input
                    type="number"
                    required
                    className="mt-1 input-primary"
                    value={formData.limits.upiPerTransactionLimit}
                    onChange={(e) => setFormData({
                      ...formData,
                      limits: { ...formData.limits, upiPerTransactionLimit: e.target.value }
                    })}
                  />
                </div>
              </>
            )}
          </div>

          {type === 'admin' && (
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.routingEnabled}
                  onChange={(e) => setFormData({ ...formData, routingEnabled: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Enable for transaction routing
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Remarks
          </label>
          <textarea
            rows={3}
            className="mt-1 input-primary"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button type="submit" className="btn-primary">
          {initialData ? 'Update Account' : 'Add Account'}
        </button>
      </div>
    </form>
  );
}