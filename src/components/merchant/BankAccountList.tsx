import React, { useState } from 'react';
import { Building2, Smartphone, Plus, AlertTriangle } from 'lucide-react';
import { BankAccount, BankDevice } from '../../types/bank';
import { Dialog } from '../ui/Dialog';
import { BankAccountForm } from './BankAccountForm';
import { Toast } from '../notifications/Toast';

interface BankAccountListProps {
  accounts: BankAccount[];
  devices: Record<string, BankDevice[]>;
  onAddAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onAddDevice: (accountId: string, device: Omit<BankDevice, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export function BankAccountList({
  accounts,
  devices,
  onAddAccount,
  onAddDevice
}: BankAccountListProps) {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleAddAccount = async (data: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await onAddAccount(data);
      setToastMessage('Bank account added successfully');
      setToastType('success');
      setShowAddAccount(false);
    } catch (error) {
      setToastMessage('Failed to add bank account');
      setToastType('error');
    }
    setShowToast(true);
  };

  const handleAddDevice = async (data: Omit<BankDevice, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedAccount) return;

    try {
      await onAddDevice(selectedAccount.id, data);
      setToastMessage('Device added successfully');
      setToastType('success');
      setShowAddDevice(false);
      setSelectedAccount(null);
    } catch (error) {
      setToastMessage('Failed to add device');
      setToastType('error');
    }
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Bank Accounts
        </h2>
        <button
          onClick={() => setShowAddAccount(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Bank Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map(account => {
          const accountDevices = devices[account.id] || [];
          const onlineDevices = accountDevices.filter(d => d.status === 'online');

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
                <button
                  onClick={() => {
                    setSelectedAccount(account);
                    setShowAddDevice(true);
                  }}
                  className="btn-secondary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </button>
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
                      Status
                    </dt>
                    <dd className={`text-sm font-medium ${
                      onlineDevices.length > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {onlineDevices.length > 0 ? 'Active' : 'No Online Devices'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">
                      Devices
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {onlineDevices.length}/{accountDevices.length} Online
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog
        isOpen={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        title="Add Bank Account"
      >
        <BankAccountForm onSubmit={handleAddAccount} />
      </Dialog>

      <Dialog
        isOpen={showAddDevice}
        onClose={() => {
          setShowAddDevice(false);
          setSelectedAccount(null);
        }}
        title="Add Device"
      >
        {/* Add your device form component here */}
      </Dialog>

      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}