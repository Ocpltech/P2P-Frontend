import React, { useState } from 'react';
import { Smartphone, Save, Trash2, AlertTriangle, QrCode, Plus } from 'lucide-react';
import { SMSConfig } from '../../types/sms';
import { Toast } from '../../components/notifications/Toast';
import { Dialog } from '../../components/ui/Dialog';
import { QRCodeGenerator } from '../../components/qr/QRCodeGenerator';

export function SMSIntegration() {
  const [config, setConfig] = useState<SMSConfig>({
    deviceId: '',
    username: '',
    password: '',
    serverUrl: 'https://api.sms-gate.app/3rdparty/v1',
    isPrivateServer: false
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);

  const handleSave = async () => {
    try {
      // In a real app, this would make an API call
      console.log('Saving SMS configuration:', config);
      setToastMessage('SMS integration configured successfully');
      setToastType('success');
    } catch (error) {
      setToastMessage('Failed to configure SMS integration');
      setToastType('error');
    }
    setShowToast(true);
  };

  const handleDelete = async () => {
    try {
      // In a real app, this would make an API call
      setToastMessage('SMS integration removed successfully');
      setToastType('success');
      setShowConfirmDialog(false);
    } catch (error) {
      setToastMessage('Failed to remove SMS integration');
      setToastType('error');
    }
    setShowToast(true);
  };

  const getQRData = () => {
    return JSON.stringify({
      deviceId: config.deviceId,
      serverUrl: config.serverUrl,
      username: config.username,
      isPrivateServer: config.isPrivateServer
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SMS Integration</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure SMS notifications for payment confirmations
          </p>
        </div>
        <button
          onClick={() => setShowQRDialog(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
            SMS Gateway Settings
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Device ID
              </label>
              <input
                type="text"
                required
                className="mt-1 input-primary"
                value={config.deviceId}
                onChange={(e) => setConfig({ ...config, deviceId: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                required
                className="mt-1 input-primary"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 input-primary"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Server URL
              </label>
              <input
                type="url"
                required
                className="mt-1 input-primary"
                value={config.serverUrl}
                onChange={(e) => setConfig({ ...config, serverUrl: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={config.isPrivateServer}
                onChange={(e) => setConfig({ ...config, isPrivateServer: e.target.checked })}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Use private server
              </span>
            </label>
          </div>

          <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
            <div className="text-sm text-yellow-700 dark:text-yellow-300">
              <p className="font-medium">Important Notes:</p>
              <ul className="mt-1 list-disc list-inside">
                <li>Make sure the device has a stable internet connection</li>
                <li>Keep the device charged and connected to power</li>
                <li>SMS notifications are critical for payment confirmations</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="btn-secondary text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Integration
            </button>

            <button onClick={handleSave} className="btn-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        title="Remove SMS Integration"
      >
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-3" />
            <p className="text-sm text-red-700 dark:text-red-300">
              Removing the SMS integration will stop all payment notifications. This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowConfirmDialog(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn-primary bg-red-600 hover:bg-red-700"
            >
              Remove Integration
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={showQRDialog}
        onClose={() => setShowQRDialog(false)}
        title="Add SMS Device"
      >
        <div className="space-y-6">
          <div className="text-center">
            <QRCodeGenerator
              value={getQRData()}
              size={256}
              downloadEnabled={true}
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Scan this QR code with the SMS Gateway app
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The app will automatically configure the device
            </p>
          </div>

          <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <QrCode className="w-5 h-5 text-blue-400 mr-3" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Download the SMS Gateway app from the Play Store to scan this code
            </p>
          </div>
        </div>
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