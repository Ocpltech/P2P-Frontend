import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateMerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CreateMerchantModal({ isOpen, onClose, onSubmit }: CreateMerchantModalProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    address: '',
    bankAccount: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountType: ''
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Merchant</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Name
              </label>
              <input
                type="text"
                required
                className="mt-1 input-primary"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 input-primary"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="tel"
                required
                className="mt-1 input-primary"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Type
              </label>
              <select
                required
                className="mt-1 input-primary"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              >
                <option value="">Select Business Type</option>
                <option value="private_limited">Private Limited</option>
                <option value="partnership">Partnership</option>
                <option value="proprietorship">Proprietorship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GST Number
              </label>
              <input
                type="text"
                required
                className="mt-1 input-primary"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                PAN Number
              </label>
              <input
                type="text"
                required
                className="mt-1 input-primary"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Address
            </label>
            <textarea
              required
              rows={3}
              className="mt-1 input-primary"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Bank Account Details
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Number
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 input-primary"
                  value={formData.bankAccount.accountNumber}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankAccount: { ...formData.bankAccount, accountNumber: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  IFSC Code
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 input-primary"
                  value={formData.bankAccount.ifscCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankAccount: { ...formData.bankAccount, ifscCode: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 input-primary"
                  value={formData.bankAccount.bankName}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankAccount: { ...formData.bankAccount, bankName: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Type
                </label>
                <select
                  required
                  className="mt-1 input-primary"
                  value={formData.bankAccount.accountType}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankAccount: { ...formData.bankAccount, accountType: e.target.value }
                  })}
                >
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Merchant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}