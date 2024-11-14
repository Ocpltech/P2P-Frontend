import React, { useState } from 'react';
import { Building2, AlertTriangle } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';

interface BankAccountFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function BankAccountForm({ onSubmit, initialData }: BankAccountFormProps) {
  const [formData, setFormData] = useState({
    accountNumber: initialData?.accountNumber || '',
    confirmAccountNumber: initialData?.accountNumber || '',
    ifscCode: initialData?.ifscCode || '',
    accountName: initialData?.accountName || '',
    bankName: initialData?.bankName || '',
    accountType: initialData?.accountType || 'savings',
    branchName: initialData?.branchName || '',
    upiEnabled: initialData?.upiEnabled || false,
    upiId: initialData?.upiId || '',
    supportedMethods: initialData?.supportedMethods || ['upi', 'imps', 'neft', 'rtgs'],
    limits: {
      daily: initialData?.limits?.daily || 1000000,
      perTransaction: initialData?.limits?.perTransaction || 100000,
      monthly: initialData?.limits?.monthly || 10000000
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.accountNumber = 'Account numbers do not match';
    }

    if (!formData.ifscCode.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      newErrors.ifscCode = 'Invalid IFSC code format';
    }

    if (formData.upiEnabled && !formData.upiId) {
      newErrors.upiId = 'UPI ID is required when UPI is enabled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      ...formData,
      accountNumber: formData.accountNumber,
      status: 'active'
    });
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
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          >
            <option value="">Select Bank</option>
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="ICICI Bank">ICICI Bank</option>
            <option value="State Bank of India">State Bank of India</option>
            <option value="Axis Bank">Axis Bank</option>
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
          <input
            type="text"
            required
            className={`mt-1 input-primary ${errors.ifscCode ? 'border-red-500' : ''}`}
            value={formData.ifscCode}
            onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
            placeholder="HDFC0000123"
          />
          {errors.ifscCode && (
            <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Branch Name
          </label>
          <input
            type="text"
            required
            className="mt-1 input-primary"
            value={formData.branchName}
            onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
          />
        </div>

        <div className="sm:col-span-2">
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

        {formData.upiEnabled && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              UPI ID
            </label>
            <input
              type="text"
              className={`mt-1 input-primary ${errors.upiId ? 'border-red-500' : ''}`}
              value={formData.upiId}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
              placeholder="username@bank"
            />
            {errors.upiId && (
              <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
            )}
          </div>
        )}

        <div className="sm:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Transaction Limits
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Daily Limit (₹)
              </label>
              <input
                type="number"
                required
                className="mt-1 input-primary"
                value={formData.limits.daily}
                onChange={(e) => setFormData({
                  ...formData,
                  limits: { ...formData.limits, daily: parseInt(e.target.value) }
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
                className="mt-1 input-primary"
                value={formData.limits.perTransaction}
                onChange={(e) => setFormData({
                  ...formData,
                  limits: { ...formData.limits, perTransaction: parseInt(e.target.value) }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Monthly Limit (₹)
              </label>
              <input
                type="number"
                required
                className="mt-1 input-primary"
                value={formData.limits.monthly}
                onChange={(e) => setFormData({
                  ...formData,
                  limits: { ...formData.limits, monthly: parseInt(e.target.value) }
                })}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Supported Payment Methods
          </h4>
          
          <div className="space-y-2">
            {(['upi', 'imps', 'neft', 'rtgs'] as PaymentMethod[]).map((method) => (
              <label key={method} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.supportedMethods.includes(method)}
                  onChange={(e) => {
                    const methods = e.target.checked
                      ? [...formData.supportedMethods, method]
                      : formData.supportedMethods.filter(m => m !== method);
                    setFormData({ ...formData, supportedMethods: methods });
                  }}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 uppercase">
                  {method}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Make sure to verify all bank account details before saving. Incorrect details may lead to failed transactions.
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button type="submit" className="btn-primary">
          {initialData ? 'Update Account' : 'Add Account'}
        </button>
      </div>
    </form>
  );
}