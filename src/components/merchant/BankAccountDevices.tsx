import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BankDevice } from '../../types/bank';
import { BankDeviceList } from './BankDeviceList';
import { AddDeviceForm } from './AddDeviceForm';
import { Dialog } from '../ui/Dialog';
import { Toast } from '../notifications/Toast';

interface BankAccountDevicesProps {
  bankAccountId: string;
  devices: BankDevice[];
  onAddDevice: (data: { phoneNumber: string; deviceId: string }) => Promise<void>;
  onRemoveDevice: (deviceId: string) => Promise<void>;
}

export function BankAccountDevices({
  bankAccountId,
  devices,
  onAddDevice,
  onRemoveDevice
}: BankAccountDevicesProps) {
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleAddDevice = async (data: { phoneNumber: string; deviceId: string }) => {
    try {
      await onAddDevice(data);
      setToastMessage('Device added successfully');
      setToastType('success');
      setShowAddDevice(false);
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
          Registered Devices
        </h2>
        <button
          onClick={() => setShowAddDevice(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </button>
      </div>

      <BankDeviceList
        devices={devices}
        onRemoveDevice={onRemoveDevice}
      />

      <Dialog
        isOpen={showAddDevice}
        onClose={() => setShowAddDevice(false)}
        title="Add Device"
      >
        <AddDeviceForm
          bankAccountId={bankAccountId}
          onSubmit={handleAddDevice}
        />
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