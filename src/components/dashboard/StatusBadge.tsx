import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Transaction } from '../../types/dashboard';

interface StatusBadgeProps {
  status: Transaction['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: Transaction['status']) => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle2,
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          textColor: 'text-green-700 dark:text-green-400',
          label: 'Success'
        };
      case 'pending':
        return {
          icon: Clock,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          textColor: 'text-yellow-700 dark:text-yellow-400',
          label: 'Pending'
        };
      case 'failed':
        return {
          icon: XCircle,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          textColor: 'text-red-700 dark:text-red-400',
          label: 'Failed'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
      <Icon className="w-4 h-4 mr-1.5" />
      {config.label}
    </span>
  );
}