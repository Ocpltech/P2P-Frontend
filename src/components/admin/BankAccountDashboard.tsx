import React, { useState, useEffect } from 'react';
import { Building2, Smartphone, AlertTriangle, RefreshCw } from 'lucide-react';
import { BankAccount, BankDevice } from '../../types/bank';
import { Toast } from '../notifications/Toast';

interface BankAccountDashboardProps {
  accounts: BankAccount[];
  devices: Record<string, BankDevice[]>;
  onRefresh: () => void;
}

export function BankAccountDashboard({
  accounts,
  devices,
  onRefresh
}: BankAccountDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      setShowToast(true);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getAccountStatus = (account: BankAccount) => {
    const accountDevices = devices[account.id] || [];
    const onlineDevices = accountDevices.filter(d => d.status === 'online');
    
    if (account.status === 'inactive') {
      return {
        label: 'Inactive',
        color: 'text-gray-500 dark:text-gray-400',
        bgColor: 'bg-gray-100 dark:bg-gray-800'
      };
    }

    if (onlineDevices.length === 0) {
      return {
        label: 'No Online Devices',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/20'
      };
    }

    return {
      label: `${onlineDevices.length} Device${onlineDevices.length > 1 ? 's' : ''} Online`,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Bank Accounts
        </h2>
        <button
          onClick={handleRefresh}
          className="btn-secondary"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(account => {
          const status = getAccountStatus(account);
          const accountDevices = devices[account.id] || [];

          return (
            <div
              key={account.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
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
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <div className="space-y-4">
                {accountDevices.map(device => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Smartphone className={`w-5 h-5 ${
                        device.status === 'online'
                          ? 'text-green-500'
                          : 'text-gray-400'
                      }`} />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {device.phoneNumber}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Battery: {device.batteryLevel}% • {device.networkType}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs ${
                      device.status === 'online'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {device.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                ))}

                {accountDevices.length === 0 && (
                  <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      No devices registered
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">
                      Daily Limit
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{account.limits.daily.toLocaleString('en-IN')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">
                      Per Transaction
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{account.limits.perTransaction.toLocaleString('en-IN')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          );
        })}
      </div>

      {showToast && (
        <Toast
          type="error"
          message="Failed to refresh bank accounts"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}