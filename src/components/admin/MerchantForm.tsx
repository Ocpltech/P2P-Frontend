import React, { useState } from 'react';
import { Building2, AlertTriangle } from 'lucide-react';

interface MerchantFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function MerchantForm({ onSubmit, initialData }: MerchantFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    businessType: initialData?.businessType || '',
    gstNumber: initialData?.gstNumber || '',
    panNumber: initialData?.panNumber || '',
    address: initialData?.address || '',
    bankAccount: {
      accountNumber: initialData?.bankAccount?.accountNumber || '',
      ifscCode: initialData?.bankAccount?.ifscCode || '',
      bankName: initialData?.bankAccount?.bankName || '',
      accountType: initialData?.bankAccount?.accountType || 'savings'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Business name is required';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }

    if (!formData.gstNumber || !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Valid GST number is required';
    }

    if (!formData.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Valid PAN number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          {initialData ? 'Edit Merchant' : 'Add New Merchant'}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Business Name
          </label>
          <input
            type="text"
            required
            className={`mt-1 input-primary ${errors.name ? 'border-red-500' : ''}`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
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
            <option value="llp">LLP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            required
            className={`mt-1 input-primary ${errors.email ? 'border-red-500' : ''}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            required
            className={`mt-1 input-primary ${errors.phone ? 'border-red-500' : ''}`}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="10-digit number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            GST Number
          </label>
          <input
            type="text"
            required
            className={`mt-1 input-primary ${errors.gstNumber ? 'border-red-500' : ''}`}
            value={formData.gstNumber}
            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
            placeholder="22AAAAA0000A1Z5"
          />
          {errors.gstNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.gstNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            PAN Number
          </label>
          <input
            type="text"
            required
            className={`mt-1 input-primary ${errors.panNumber ? 'border-red-500' : ''}`}
            value={formData.panNumber}
            onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
            placeholder="AAAAA0000A"
          />
          {errors.panNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.panNumber}</p>
          )}
        </div>

        <div className="sm:col-span-2">
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

        <div className="sm:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Bank Account Details
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bank Name
              </label>
              <select
                required
                className="mt-1 input-primary"
                value={formData.bankAccount.bankName}
                onChange={(e) => setFormData({
                  ...formData,
                  bankAccount: { ...formData.bankAccount, bankName: e.target.value }
                })}
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
                value={formData.bankAccount.accountType}
                onChange={(e) => setFormData({
                  ...formData,
                  bankAccount: { ...formData.bankAccount, accountType: e.target.value }
                })}
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
                  bankAccount: { ...formData.bankAccount, ifscCode: e.target.value.toUpperCase() }
                })}
                placeholder="HDFC0000123"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Please verify all details carefully. These details will be used for settlements and compliance.
        </p>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          {initialData ? 'Update Merchant' : 'Add Merchant'}
        </button>
      </div>
    </form>
  );
}