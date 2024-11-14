import React, { useState } from 'react';
import { Shield, Bell, Globe, Database, Key, Users, Save } from 'lucide-react';
import { Toast } from '../../components/notifications/Toast';

export function SystemSettings() {
  const [showToast, setShowToast] = useState(false);
  const [settings, setSettings] = useState({
    security: {
      twoFactor: true,
      ipWhitelist: false,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireSpecialChar: true,
        requireNumber: true,
        requireUppercase: true
      }
    },
    notifications: {
      email: true,
      slack: false,
      webhook: true,
      criticalAlerts: true
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      apiTimeout: 30,
      maxRetries: 3
    }
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving settings:', settings);
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure system-wide settings and preferences
          </p>
        </div>
        <button className="btn-primary" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Security Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Configure authentication and security policies
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Require 2FA for all admin accounts
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.security.twoFactor}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, twoFactor: e.target.checked }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    IP Whitelisting
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Restrict access to specific IP addresses
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.security.ipWhitelist}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, ipWhitelist: e.target.checked }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Session Timeout (minutes)
                </h3>
                <input
                  type="number"
                  className="input-primary w-full sm:w-32"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notification Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Configure system notifications and alerts
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Send notifications via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: e.target.checked }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Slack Integration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Send notifications to Slack
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.slack}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, slack: e.target.checked }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  System Configuration
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Configure system behavior and performance
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Maintenance Mode
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable system maintenance mode
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.system.maintenanceMode}
                    onChange={(e) => setSettings({
                      ...settings,
                      system: { ...settings.system, maintenanceMode: e.target.checked }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  API Timeout (seconds)
                </h3>
                <input
                  type="number"
                  className="input-primary w-full sm:w-32"
                  value={settings.system.apiTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, apiTimeout: parseInt(e.target.value) }
                  })}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Maximum Retries
                </h3>
                <input
                  type="number"
                  className="input-primary w-full sm:w-32"
                  value={settings.system.maxRetries}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, maxRetries: parseInt(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4">
          <Toast
            type="success"
            message="Settings saved successfully"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}