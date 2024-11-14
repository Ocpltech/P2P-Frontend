import React from 'react';
import { Smartphone, Building2, Zap, Clock } from 'lucide-react';

interface PaymentMethodsProps {
  onSelect: (method: 'upi' | 'imps' | 'neft' | 'rtgs') => void;
  amount: number;
}

export function PaymentMethods({ onSelect, amount }: PaymentMethodsProps) {
  const methods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Instant payment using UPI',
      badge: 'Free',
      limit: '₹1,00,000 per transaction'
    },
    {
      id: 'imps',
      name: 'IMPS',
      icon: Zap,
      description: '24x7 instant transfer',
      badge: '₹5',
      limit: '₹5,00,000 per transaction'
    },
    {
      id: 'neft',
      name: 'NEFT',
      icon: Clock,
      description: 'Batch processing every 30 mins',
      badge: '₹2.5',
      limit: 'No limit'
    },
    {
      id: 'rtgs',
      name: 'RTGS',
      icon: Building2,
      description: 'Real-time high value transfer',
      badge: '₹20',
      limit: 'Min ₹2,00,000'
    }
  ];

  // Filter out RTGS for amounts less than 2,00,000
  const availableMethods = methods.filter(method => 
    method.id !== 'rtgs' || amount >= 200000
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      {availableMethods.map((method) => {
        const Icon = method.icon;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id as 'upi' | 'imps' | 'neft' | 'rtgs')}
            className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4 flex-1 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {method.name}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  {method.badge}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {method.description}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Limit: {method.limit}
              </p>
            </div>
          </button>
        );
      })}

      <div className="mt-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <Clock className="w-4 h-4 mr-2" />
        NEFT & RTGS available 24x7 on all days
      </div>
    </div>
  );
}