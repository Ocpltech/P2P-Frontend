import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Code, QrCode, Smartphone } from 'lucide-react';
import { Toast } from '../../components/notifications/Toast';
import { Dialog } from '../../components/ui/Dialog';
import { motion } from 'framer-motion';
import { CodeBlock } from '../../components/ui/CodeBlock';

interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  environment: 'test' | 'live';
  permissions: string[];
}

const mockAPIKeys: APIKey[] = [
  {
    id: 'key_1',
    name: 'Production API Key',
    key: 'sk_live_123456789',
    createdAt: '2024-03-15T10:30:00Z',
    lastUsed: '2024-03-15T15:45:00Z',
    environment: 'live',
    permissions: ['read', 'write']
  },
  {
    id: 'key_2',
    name: 'Test API Key',
    key: 'sk_test_987654321',
    createdAt: '2024-03-14T09:15:00Z',
    lastUsed: '2024-03-15T14:30:00Z',
    environment: 'test',
    permissions: ['read']
  }
];

export default function APIManagement() {
  const [apiKeys, setApiKeys] = useState(mockAPIKeys);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const handleCreateKey = (data: Partial<APIKey>) => {
    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      name: data.name || '',
      key: `sk_${data.environment}_${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      environment: data.environment || 'test',
      permissions: data.permissions || []
    };

    setApiKeys([...apiKeys, newKey]);
    setShowCreateDialog(false);
    setToastMessage('API key created successfully');
    setShowToast(true);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setToastMessage('API key copied to clipboard');
    setShowToast(true);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    setToastMessage('API key revoked successfully');
    setShowToast(true);
  };

  const toggleShowKey = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your API keys and access credentials
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Active Keys
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {apiKeys.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <QrCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              API Requests
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            12.5K
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              Active Integrations
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            3
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            API Keys
          </h2>

          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {apiKey.name}
                    </h3>
                    <div className="mt-1 flex items-center space-x-2">
                      <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {showKey[apiKey.id] ? apiKey.key : '••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => toggleShowKey(apiKey.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {showKey[apiKey.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyKey(apiKey.key)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${apiKey.environment === 'live'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {apiKey.environment}
                    </span>
                    <button
                      onClick={() => handleRevokeKey(apiKey.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Created {new Date(apiKey.createdAt).toLocaleDateString()} • 
                  Last used {new Date(apiKey.lastUsed).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            API Documentation
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Authentication
              </h3>
              <CodeBlock
                code={`
// Include your API key in the Authorization header
const response = await fetch('https://api.example.com/v1/payments', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Create Payment
              </h3>
              <CodeBlock
                code={`
// Create a new payment
const payment = await fetch('https://api.example.com/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 1000,
    currency: 'INR',
    description: 'Test payment'
  })
});`}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        title="Create API Key"
      >
        <CreateAPIKeyForm
          onSubmit={handleCreateKey}
          onCancel={() => setShowCreateDialog(false)}
        />
      </Dialog>

      {showToast && (
        <Toast
          type="success"
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

interface CreateAPIKeyFormProps {
  onSubmit: (data: Partial<APIKey>) => void;
  onCancel: () => void;
}

function CreateAPIKeyForm({ onSubmit, onCancel }: CreateAPIKeyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    environment: 'test',
    permissions: ['read']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Key Name
        </label>
        <input
          type="text"
          required
          className="mt-1 input-primary"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Production API Key"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Environment
        </label>
        <select
          required
          className="mt-1 input-primary"
          value={formData.environment}
          onChange={(e) => setFormData({ ...formData, environment: e.target.value as 'test' | 'live' })}
        >
          <option value="test">Test</option>
          <option value="live">Live</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Permissions
        </label>
        <div className="mt-2 space-y-2">
          {['read', 'write', 'admin'].map((permission) => (
            <label key={permission} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={formData.permissions.includes(permission)}
                onChange={(e) => {
                  const newPermissions = e.target.checked
                    ? [...formData.permissions, permission]
                    : formData.permissions.filter(p => p !== permission);
                  setFormData({ ...formData, permissions: newPermissions });
                }}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                {permission}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          Create Key
        </button>
      </div>
    </form>
  );
}