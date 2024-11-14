import React, { useState } from 'react';
import { Smartphone, QrCode } from 'lucide-react';
import { QRCodeGenerator } from '../qr/QRCodeGenerator';

interface AddDeviceFormProps {
  bankAccountId: string;
  onSubmit: (data: {
    phoneNumber: string;
    deviceId: string;
  }) => Promise<void>;
}

export function AddDeviceForm({ bankAccountId, onSubmit }: AddDeviceFormProps) {
  const [step, setStep] = useState<'form' | 'qr'>('form');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    deviceId: `dev_${Date.now()}`
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setStep('qr');
  };

  const getQRData = () => {
    return JSON.stringify({
      deviceId: formData.deviceId,
      bankAccountId,
      phoneNumber: formData.phoneNumber
    });
  };

  if (step === 'qr') {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <QRCodeGenerator
            value={getQRData()}
            size={256}
            downloadEnabled={true}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Scan this QR code with the SMS Gateway app
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The app will automatically configure the device
          </p>
        </div>

        <button
          onClick={() => setStep('form')}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Register another device
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          Add New Device
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone Number
        </label>
        <input
          type="tel"
          required
          className="mt-1 input-primary"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="+91 1234567890"
        />
      </div>

      <div className="pt-4">
        <button type="submit" className="btn-primary w-full">
          <QrCode className="w-4 h-4 mr-2" />
          Generate QR Code
        </button>
      </div>
    </form>
  );
}