import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { SMSNotification } from '../../types/sms';
import { PaymentMethod } from '../../types/payment';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  transactionId: string;
  method: PaymentMethod;
  smsNotifications: SMSNotification[];
  onSuccess: () => void;
  onFailed: () => void;
}

export function PaymentConfirmationModal({
  isOpen,
  onClose,
  amount,
  transactionId,
  method,
  smsNotifications,
  onSuccess,
  onFailed
}: PaymentConfirmationModalProps) {
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Check for matching SMS notification
    const matchingNotification = smsNotifications.find(
      notification => notification.amount === amount && notification.transactionType === 'credit'
    );

    if (matchingNotification) {
      setStatus('success');
      onSuccess();
      return;
    }

    // Set up timeout based on payment method
    const timeoutDuration = method === 'imps' || method === 'upi' ? 300000 : 3600000; // 5 mins for IMPS/UPI, 1 hour for others
    const timeout = setTimeout(() => {
      if (status === 'pending') {
        setStatus('failed');
        onFailed();
      }
    }, timeoutDuration);

    // Update elapsed time
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [amount, isOpen, method, onFailed, onSuccess, smsNotifications, status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle2,
          title: 'Payment Successful',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-100 dark:bg-green-900/20'
        };
      case 'failed':
        return {
          icon: XCircle,
          title: 'Payment Failed',
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20'
        };
      default:
        return {
          icon: Clock,
          title: 'Waiting for Confirmation',
          color: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Status"
    >
      <div className="text-center">
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
          {status === 'pending' && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Time Elapsed: {formatTime(timeElapsed)}
            </p>
          )}
        </div>

        {status === 'pending' && (
          <div className="flex justify-center items-center mb-4">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Waiting for bank confirmation...
            </span>
          </div>
        )}

        <div className="space-y-3">
          {status === 'failed' && (
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Try Again
            </button>
          )}
          {status === 'success' && (
            <button
              onClick={onClose}
              className="btn-primary w-full"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
}