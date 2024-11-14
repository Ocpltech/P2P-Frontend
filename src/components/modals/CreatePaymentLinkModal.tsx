import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';
import { QRCodeGenerator } from '../qr/QRCodeGenerator';

interface CreatePaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CreatePaymentLinkModal({ isOpen, onClose, onSubmit }: CreatePaymentLinkModalProps) {
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    expiryDate: '',
    maxPayments: '',
    redirectUrl: '',
    notificationEmail: '',
    customFields: [] as string[]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setShowQR(true);
  };

  const addCustomField = () => {
    setFormData({
      ...formData,
      customFields: [...formData.customFields, '']
    });
  };

  const removeCustomField = (index: number) => {
    const newFields = [...formData.customFields];
    newFields.splice(index, 1);
    setFormData({
      ...formData,
      customFields: newFields
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {showQR ? 'Payment Link QR Code' : 'Create Payment Link'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {showQR ? (
          <div className="text-center">
            <QRCodeGenerator
              value={`https://pay.example.com/link/${Math.random().toString(36).substring(7)}`}
              size={256}
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowQR(false)}
                className="btn-secondary"
              >
                Back to Form
              </button>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Link Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 input-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount (INR)
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 input-primary"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 input-primary"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expiry Date
                </label>
                <input
                  type="datetime-local"
                  className="mt-1 input-primary"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maximum Payments
                </label>
                <input
                  type="number"
                  className="mt-1 input-primary"
                  value={formData.maxPayments}
                  onChange={(e) => setFormData({ ...formData, maxPayments: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Redirect URL
                </label>
                <input
                  type="url"
                  className="mt-1 input-primary"
                  value={formData.redirectUrl}
                  onChange={(e) => setFormData({ ...formData, redirectUrl: e.target.value })}
                  placeholder="https://your-website.com/thank-you"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notification Email
                </label>
                <input
                  type="email"
                  className="mt-1 input-primary"
                  value={formData.notificationEmail}
                  onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={addCustomField}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Add Field
                  </button>
                </div>
                {formData.customFields.map((field, index) => (
                  <div key={index} className="flex space-x-2 mt-2">
                    <input
                      type="text"
                      className="input-primary flex-1"
                      value={field}
                      onChange={(e) => {
                        const newFields = [...formData.customFields];
                        newFields[index] = e.target.value;
                        setFormData({ ...formData, customFields: newFields });
                      }}
                      placeholder="Field name"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomField(index)}
                      className="text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
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
                Create Link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}