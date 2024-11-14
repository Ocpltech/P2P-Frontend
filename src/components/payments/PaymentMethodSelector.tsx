import React from 'react';
import { Smartphone, Building2, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { PaymentMethod } from '../../types/payment';

interface PaymentMethodSelectorProps {
  onSelect: (method: PaymentMethod) => void;
  amount: number;
}

export function PaymentMethodSelector({ onSelect, amount }: PaymentMethodSelectorProps) {
  const methods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay using any UPI app',
      badge: 'Free',
      limit: '₹1,00,000 per transaction'
    },
    {
      id: 'imps',
      name: 'IMPS Transfer',
      icon: Zap,
      description: '24x7 instant bank transfer',
      badge: '₹5',
      limit: '₹5,00,000 per transaction'
    },
    {
      id: 'neft',
      name: 'NEFT Transfer',
      icon: Clock,
      description: 'Bank transfer (30 min)',
      badge: '₹2.5',
      limit: 'No limit'
    },
    {
      id: 'rtgs',
      name: 'RTGS Transfer',
      icon: Building2,
      description: 'High value real-time transfer',
      badge: '₹20',
      limit: 'Min ₹2,00,000'
    }
  ];

  // Filter out RTGS for amounts less than 2,00,000
  const availableMethods = methods.filter(method => 
    method.id !== 'rtgs' || amount >= 200000
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {availableMethods.map((method, index) => {
        const Icon = method.icon;
        return (
          <motion.button
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(method.id as PaymentMethod)}
            className="w-full flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
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
          </motion.button>
        );
      })}
    </motion.div>
  );
}