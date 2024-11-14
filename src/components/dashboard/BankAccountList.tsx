import React, { useState } from 'react';
import { Building2, Trash2, CheckCircle2, XCircle, ArrowUpRight, Edit, QrCode } from 'lucide-react';
import { BankAccount } from '../../types/dashboard';
import { formatINR } from '../../lib/utils';
import { Dialog } from '../ui/Dialog';
import { QRCodeGenerator } from '../qr/QRCodeGenerator';

interface BankAccountListProps {
  accounts: BankAccount[];
  onEdit: (account: BankAccount) => void;
  onDelete: (accountId: string) => void;
  onViewTransactions?: (accountId: string) => void;
  type: 'admin' | 'merchant';
}

export function BankAccountList({ 
  accounts, 
  onEdit, 
  onDelete, 
  onViewTransactions,
  type 
}: BankAccountListProps) {
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {accounts.map((account) => (
        <div 
          key={account.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {account.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {account.accountNumber}
                </p>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${account.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
              }`}
            >
              {account.status === 'active' ? (
                <CheckCircle2 className="w-4 h-4 mr-1" />
              ) : (
                <XCircle className="w-4 h-4 mr-1" />
              )}
              {account.status}
            </span>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Balance</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {formatINR(account.balance)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bank</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {account.name.split(' ')[0]}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">IFSC Code</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  HDFC0001234
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  Current
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">UPI ID</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                  merchant@okicici
                  <button
                    onClick={() => setSelectedQR('merchant@okicici')}
                    className="ml-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Daily Limit</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {formatINR(1000000)}
                </dd>
              </div>
              {type === 'admin' && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Transaction Limit
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatINR(100000)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Routing Priority
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      Level 1
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={() => onEdit(account)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => onDelete(account.id)}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </button>
            </div>
            {onViewTransactions && (
              <button 
                onClick={() => onViewTransactions(account.id)}
                className="btn-primary"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                View Transactions
              </button>
            )}
          </div>
        </div>
      ))}

      <Dialog
        isOpen={!!selectedQR}
        onClose={() => setSelectedQR(null)}
        title="UPI QR Code"
      >
        {selectedQR && (
          <div className="p-4">
            <QRCodeGenerator
              value={`upi://pay?pa=${selectedQR}&pn=Merchant&mc=0000&tr=123456789`}
              size={256}
              downloadEnabled
            />
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Scan this QR code to make payments to this account
            </p>
          </div>
        )}
      </Dialog>
    </div>
  );
}