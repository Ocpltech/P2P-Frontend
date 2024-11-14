import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentStatusProps {
  status: 'success' | 'failed' | 'pending';
  amount: number;
  transactionId: string;
  onClose: () => void;
}

export function PaymentStatus({
  status,
  amount,
  transactionId,
  onClose
}: PaymentStatusProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      title: 'Payment Successful',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    failed: {
      icon: XCircle,
      title: 'Payment Failed',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    pending: {
      icon: Clock,
      title: 'Payment Pending',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className={`inline-flex p-4 rounded-full ${config.bgColor} mb-4`}>
        <Icon className={`w-12 h-12 ${config.color}`} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {config.title}
      </h2>

      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          ₹{amount.toLocaleString('en-IN')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Transaction ID: {transactionId}
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onClose}
          className="btn-primary w-full"
        >
          Done
        </button>
        {status === 'failed' && (
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary w-full"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
}