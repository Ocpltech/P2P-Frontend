import React from 'react';
import { User, Building2, Shield, Bell, CreditCard } from 'lucide-react';

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences and business details
        </p>
      </div>

      {/* Business Profile */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-6">
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
              Business Profile
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Name
              </label>
              <input type="text" className="mt-1 input-primary" defaultValue="TechCorp India Ltd" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GST Number
              </label>
              <input type="text" className="mt-1 input-primary" defaultValue="27AADCB2230M1Z3" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Category
              </label>
              <select className="mt-1 input-primary">
                <option>E-commerce</option>
                <option>SaaS</option>
                <option>Retail</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Type
              </label>
              <select className="mt-1 input-primary">
                <option>Private Limited</option>
                <option>Partnership</option>
                <option>Proprietorship</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-6">
          <div className="flex items-center">
            <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
              Bank Account Details
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Number
              </label>
              <input type="text" className="mt-1 input-primary" defaultValue="****1234" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                IFSC Code
              </label>
              <input type="text" className="mt-1 input-primary" defaultValue="HDFC0001234" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bank Name
              </label>
              <input type="text" className="mt-1 input-primary" defaultValue="HDFC Bank" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Branch
              </label>
              <input type="text" className="mt-1 input-primary" defaultValue="Mumbai Main Branch" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-6">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
              Security Settings
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Login Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified of new login attempts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}