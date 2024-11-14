import React from 'react';
import { Smartphone } from 'lucide-react';

interface UPIApp {
  id: string;
  name: string;
  icon: string;
  package: string;
}

interface UPIAppsProps {
  onSelectApp: (app: UPIApp) => void;
}

export function UPIApps({ onSelectApp }: UPIAppsProps) {
  const apps: UPIApp[] = [
    {
      id: 'gpay',
      name: 'Google Pay',
      icon: 'https://example.com/gpay.png',
      package: 'com.google.android.apps.nbu.paisa.user'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: 'https://example.com/phonepe.png',
      package: 'com.phonepe.app'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: 'https://example.com/paytm.png',
      package: 'net.one97.paytm'
    },
    {
      id: 'bhim',
      name: 'BHIM',
      icon: 'https://example.com/bhim.png',
      package: 'in.org.npci.upiapp'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {apps.map((app) => (
        <button
          key={app.id}
          onClick={() => onSelectApp(app)}
          className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-2">
            <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {app.name}
          </span>
        </button>
      ))}
    </div>
  );
}