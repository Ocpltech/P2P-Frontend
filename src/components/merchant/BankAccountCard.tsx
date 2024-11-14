import React from 'react';
import { Building2, Smartphone, AlertTriangle } from 'lucide-react';
import { BankAccount } from '../../types/bank';

interface BankAccountCardProps {
  account: BankAccount;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function BankAccountCard({ account, onEdit, onDelete }: BankAccountCardProps) {
  const getStatusColor = (status: 'active' | 'inactive') => {
    return status === 'active'
      ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {account.bankName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {account.accountNumber}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
          {account.status}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Account Type
          </dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
            {account.type}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            IFSC Code
          </dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
            {account.ifscCode}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Branch
          </dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
            {account.branchName}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            UPI Status
          </dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
            {account.upiEnabled ? (
              <span className="text-green-600 dark:text-green-400">Enabled</span>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">Disabled</span>
            )}
          </dd>
        </div>
      </dl>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Transaction Limits
        </h4>
        <dl className="grid grid-cols-3 gap-4">
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">Daily</dt>
            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
              ₹{account.limits.daily.toLocaleString('en-IN')}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">Per Transaction</dt>
            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
              ₹{account.limits.perTransaction.toLocaleString('en-IN')}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">Monthly</dt>
            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
              ₹{account.limits.monthly.toLocaleString('en-IN')}
            </dd>
          </div>
        </dl>
      </div>

      {account.status === 'inactive' && (
        <div className="mt-4 flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
          <p className="text-sm text-red-700 dark:text-red-300">
            This account is currently inactive. No transactions can be processed.
          </p>
        </div>
      )}

      {(onEdit || onDelete) && (
        <div className="mt-4 flex justify-end space-x-3">
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}