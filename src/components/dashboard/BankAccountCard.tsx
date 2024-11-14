import React from 'react';
import { Building2, TrendingUp, ArrowUpRight } from 'lucide-react';
import { BankAccount } from '../../types/dashboard';
import { formatINR } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

interface BankAccountCardProps {
  account: BankAccount;
}

export function BankAccountCard({ account }: BankAccountCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{account.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Account: {account.accountNumber}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-sm rounded-full ${
          account.status === 'active' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
        }`}>
          {account.status}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {formatINR(account.balance)}
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigate('/merchant/analytics')}
              className="btn-secondary"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </button>
            <button 
              onClick={() => navigate('/merchant/transactions')}
              className="btn-primary"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}