import React, { useState } from 'react';
import { Smartphone, Save, Trash2 } from 'lucide-react';
import { SMSConfig } from '../../types/sms';
import { Toast } from '../notifications/Toast';

interface SMSIntegrationProps {
  initialConfig?: SMSConfig;
  onSave: (config: SMSConfig) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function SMSIntegration({ initialConfig, onSave, onDelete }: SMSIntegrationProps) {
  const [config, setConfig] = useState<SMSConfig>(initialConfig || {
    deviceId: '',
    username: '',
    password: '',
    serverUrl: 'https://api.sms-gate.app/3rdparty/v1',
    isPrivateServer: false
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(config);
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
      await onDelete();
      setToastMessage('SMS integration removed successfully');
      setToastType('success');
    } catch (error) {
      setToastMessage('Failed to remove SMS integration');
      setToastType('error');
    }
    setShowToast(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          SMS Integration Settings
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="btn-secondary text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove Integration
          </button>

          <button type="submit" className="btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </form>

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