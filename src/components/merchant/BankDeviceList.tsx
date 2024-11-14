import React, { useState } from 'react';
import { Smartphone, Battery, Wifi, AlertTriangle } from 'lucide-react';
import { BankDevice } from '../../types/bank';
import { Toast } from '../notifications/Toast';

interface BankDeviceListProps {
  devices: BankDevice[];
  onRemoveDevice: (deviceId: string) => Promise<void>;
}

export function BankDeviceList({ devices, onRemoveDevice }: BankDeviceListProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleRemoveDevice = async (deviceId: string) => {
    try {
      await onRemoveDevice(deviceId);
      setToastMessage('Device removed successfully');
      setToastType('success');
    } catch (error) {
      setToastMessage('Failed to remove device');
      setToastType('error');
    }
    setShowToast(true);
  };

  const getBatteryIcon = (level: number) => {
    if (level > 75) return 'text-green-500';
    if (level > 25) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getNetworkIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case '4g':
      case 'wifi':
        return 'text-green-500';
      case '3g':
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <div
          key={device.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${
                device.status === 'online'
                  ? 'bg-green-100 dark:bg-green-900/20'
                  : 'bg-gray-100 dark:bg-gray-900/20'
              }`}>
                <Smartphone className={`w-5 h-5 ${
                  device.status === 'online'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400'
                }`} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {device.phoneNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last seen: {new Date(device.lastSeen).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveDevice(device.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <Battery className={`w-4 h-4 mr-1 ${getBatteryIcon(device.batteryLevel)}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {device.batteryLevel}%
              </span>
            </div>
            <div className="flex items-center">
              <Wifi className={`w-4 h-4 mr-1 ${getNetworkIcon(device.networkType)}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {device.networkType}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                v{device.appVersion}
              </span>
            </div>
          </div>

          {device.status === 'offline' && (
            <div className="mt-4 flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Device is currently offline. SMS notifications may be delayed.
              </p>
            </div>
          )}
        </div>
      ))}

      {devices.length === 0 && (
        <div className="text-center py-8">
          <Smartphone className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No devices registered
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add a device to start receiving SMS notifications
          </p>
        </div>
      )}

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