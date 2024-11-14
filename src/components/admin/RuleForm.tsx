import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';

interface RuleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function RuleForm({ onSubmit, onCancel, initialData }: RuleFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    conditions: {
      amount: {
        min: initialData?.conditions?.amount?.min || 0,
        max: initialData?.conditions?.amount?.max || Infinity
      },
      methods: initialData?.conditions?.methods || ['upi', 'imps', 'neft', 'rtgs'],
      merchantCategories: initialData?.conditions?.merchantCategories || []
    },
    bankAccounts: initialData?.bankAccounts || [],
    isActive: initialData?.isActive ?? true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Rule name is required';
    }

    if (formData.conditions.amount.min < 0) {
      newErrors.minAmount = 'Minimum amount cannot be negative';
    }

    if (formData.conditions.amount.max !== Infinity && 
        formData.conditions.amount.max < formData.conditions.amount.min) {
      newErrors.maxAmount = 'Maximum amount must be greater than minimum amount';
    }

    if (formData.conditions.methods.length === 0) {
      newErrors.methods = 'At least one payment method must be selected';
    }

    if (formData.bankAccounts.length === 0) {
      newErrors.bankAccounts = 'At least one bank account must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  const merchantCategories = [
    'E-commerce',
    'Retail',
    'Services',
    'Education',
    'Healthcare',
    'Travel',
    'Food & Beverage',
    'Others'
  ];

  const mockBankAccounts = [
    { id: 'ba_1', name: 'HDFC Bank ****1234' },
    { id: 'ba_2', name: 'ICICI Bank ****5678' },
    { id: 'ba_3', name: 'SBI ****9012' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Rule Name
        </label>
        <input
          type="text"
          required
          className={`mt-1 input-primary ${errors.name ? 'border-red-500' : ''}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., High Value Transactions"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Minimum Amount (₹)
          </label>
          <input
            type="number"
            required
            className={`mt-1 input-primary ${errors.minAmount ? 'border-red-500' : ''}`}
            value={formData.conditions.amount.min}
            onChange={(e) => setFormData({
              ...formData,
              conditions: {
                ...formData.conditions,
                amount: {
                  ...formData.conditions.amount,
                  min: parseFloat(e.target.value)
                }
              }
            })}
          />
          {errors.minAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.minAmount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Maximum Amount (₹)
          </label>
          <input
            type="number"
            className={`mt-1 input-primary ${errors.maxAmount ? 'border-red-500' : ''}`}
            value={formData.conditions.amount.max === Infinity ? '' : formData.conditions.amount.max}
            placeholder="No limit"
            onChange={(e) => setFormData({
              ...formData,
              conditions: {
                ...formData.conditions,
                amount: {
                  ...formData.conditions.amount,
                  max: e.target.value ? parseFloat(e.target.value) : Infinity
                }
              }
            })}
          />
          {errors.maxAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.maxAmount}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Payment Methods
        </label>
        <div className="space-y-2">
          {(['upi', 'imps', 'neft', 'rtgs'] as PaymentMethod[]).map((method) => (
            <label key={method} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.conditions.methods.includes(method)}
                onChange={(e) => {
                  const methods = e.target.checked
                    ? [...formData.conditions.methods, method]
                    : formData.conditions.methods.filter(m => m !== method);
                  setFormData({
                    ...formData,
                    conditions: { ...formData.conditions, methods }
                  });
                }}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 uppercase">
                {method}
              </span>
            </label>
          ))}
        </div>
        {errors.methods && (
          <p className="mt-1 text-sm text-red-600">{errors.methods}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Merchant Categories
        </label>
        <div className="grid grid-cols-2 gap-2">
          {merchantCategories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.conditions.merchantCategories.includes(category)}
                onChange={(e) => {
                  const categories = e.target.checked
                    ? [...formData.conditions.merchantCategories, category]
                    : formData.conditions.merchantCategories.filter(c => c !== category);
                  setFormData({
                    ...formData,
                    conditions: { ...formData.conditions, merchantCategories: categories }
                  });
                }}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bank Accounts
        </label>
        <div className="space-y-2">
          {mockBankAccounts.map((account) => (
            <label key={account.id} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.bankAccounts.includes(account.id)}
                onChange={(e) => {
                  const accounts = e.target.checked
                    ? [...formData.bankAccounts, account.id]
                    : formData.bankAccounts.filter(id => id !== account.id);
                  setFormData({ ...formData, bankAccounts: accounts });
                }}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {account.name}
              </span>
            </label>
          ))}
        </div>
        {errors.bankAccounts && (
          <p className="mt-1 text-sm text-red-600">{errors.bankAccounts}</p>
        )}
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Rule is active
          </span>
        </label>
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Rules are evaluated in order of priority. Make sure to arrange them correctly after creation.
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
        <button
          type="submit"
          className="btn-primary"
        >
          {initialData ? 'Update Rule' : 'Create Rule'}
        </button>
      </div>
    </form>
  );
}