import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface KYCVerificationProps {
  merchant: {
    id: string;
    name: string;
    email: string;
    kycStatus: 'verified' | 'pending' | 'rejected';
  };
  onVerify: (status: 'verified' | 'rejected', remarks?: string) => void;
}

export function KYCVerification({ merchant, onVerify }: KYCVerificationProps) {
  const [status, setStatus] = useState<'verified' | 'rejected'>(
    merchant.kycStatus === 'rejected' ? 'rejected' : 'verified'
  );
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(status, remarks);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            KYC Verification
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {merchant.name}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Verification Status
          </label>
          <div className="mt-2 space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                checked={status === 'verified'}
                onChange={() => setStatus('verified')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Verify KYC
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-red-600"
                checked={status === 'rejected'}
                onChange={() => setStatus('rejected')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Reject KYC
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Remarks
          </label>
          <textarea
            className="mt-1 input-primary"
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder={status === 'rejected' ? 'Please provide reason for rejection' : 'Add any additional notes'}
          />
        </div>

        {status === 'rejected' && (
          <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-3" />
            <p className="text-sm text-red-700 dark:text-red-300">
              Rejecting KYC will prevent the merchant from processing transactions.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button type="submit" className="btn-primary">
          {status === 'verified' ? 'Verify KYC' : 'Reject KYC'}
        </button>
      </div>
    </form>
  );
}