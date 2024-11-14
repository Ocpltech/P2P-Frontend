import React from 'react';
import { Building2, Copy, AlertTriangle } from 'lucide-react';
import { Toast } from '../notifications/Toast';

interface BankTransferDetailsProps {
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountName: string;
    bankName: string;
    branchName: string;
  };
  amount: number;
  transactionId: string;
  type: 'imps' | 'neft' | 'rtgs';
}

export function BankTransferDetails({
  bankDetails,
  amount,
  transactionId,
  type
}: BankTransferDetailsProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} copied to clipboard`);
    setShowToast(true);
  };

  const getTransferInfo = () => {
    switch (type) {
      case 'imps':
        return {
          title: 'IMPS Transfer',
          description: '24x7 instant transfer',
          processingTime: 'Instant',
          charges: '₹5'
        };
      case 'neft':
        return {
          title: 'NEFT Transfer',
          description: 'Batch processing every 30 mins',
          processingTime: '30 minutes',
          charges: '₹2.5'
        };
      case 'rtgs':
        return {
          title: 'RTGS Transfer',
          description: 'Real-time high value transfer',
          processingTime: 'Real-time',
          charges: '₹20'
        };
    }
  };

  const info = getTransferInfo();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {info.title}
        </h3>
        <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
          {info.description}
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <dt className="text-xs text-blue-600 dark:text-blue-400">
              Processing Time
            </dt>
            <dd className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {info.processingTime}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-blue-600 dark:text-blue-400">
              Charges
            </dt>
            <dd className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {info.charges}
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {bankDetails.bankName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {bankDetails.branchName}
              </p>
            </div>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400">
                Account Number
              </label>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {bankDetails.accountNumber}
              </p>
            </div>
            <button
              onClick={() => handleCopy(bankDetails.accountNumber, 'Account number')}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400">
                IFSC Code
              </label>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {bankDetails.ifscCode}
              </p>
            </div>
            <button
              onClick={() => handleCopy(bankDetails.ifscCode, 'IFSC code')}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400">
              Account Name
            </label>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {bankDetails.accountName}
            </p>
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400">
              Transaction Reference
            </label>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {transactionId}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
        <div className="text-sm text-yellow-700 dark:text-yellow-300">
          <p className="font-medium">Important Instructions:</p>
          <ul className="mt-1 list-disc list-inside">
            <li>Please use the exact amount mentioned above</li>
            <li>Add transaction reference in remarks/description</li>
            <li>Verify all details before making the transfer</li>
          </ul>
        </div>
      </div>

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