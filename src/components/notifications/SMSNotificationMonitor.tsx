import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import { SMSNotification } from '../../types/sms';
import { Toast } from './Toast';

interface SMSNotificationMonitorProps {
  notifications: SMSNotification[];
  onDismiss: (notificationId: string) => void;
  onPaymentConfirmed: (notification: SMSNotification) => void;
}

export function SMSNotificationMonitor({
  notifications,
  onDismiss,
  onPaymentConfirmed
}: SMSNotificationMonitorProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Monitor for new credit notifications
  useEffect(() => {
    const creditNotifications = notifications.filter(n => n.transactionType === 'credit');
    if (creditNotifications.length > 0) {
      const latestNotification = creditNotifications[0];
      setToastMessage(`Payment received: ₹${latestNotification.amount.toLocaleString('en-IN')}`);
      setShowToast(true);
      onPaymentConfirmed(latestNotification);
    }
  }, [notifications, onPaymentConfirmed]);

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.transactionId}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${
                notification.transactionType === 'credit'
                  ? 'bg-green-100 dark:bg-green-900/20'
                  : 'bg-red-100 dark:bg-red-900/20'
              }`}>
                <Bell className={`w-5 h-5 ${
                  notification.transactionType === 'credit'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.bankName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Account: {notification.accountNumber}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(notification.transactionId)}
              className="text-gray-400 hover:text-gray-500"
            >
              Dismiss
            </button>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Amount</span>
              <span className={`font-medium ${
                notification.transactionType === 'credit'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {notification.transactionType === 'credit' ? '+' : '-'}
                ₹{notification.amount.toLocaleString('en-IN')}
              </span>
            </div>
            {notification.balance !== undefined && (
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500 dark:text-gray-400">Balance</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₹{notification.balance.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>

          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {new Date(notification.date).toLocaleString()}
          </div>
        </div>
      ))}

      {notifications.length === 0 && (
        <div className="text-center py-6 bg-white dark:bg-gray-800 rounded-lg">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No notifications
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            New SMS notifications will appear here
          </p>
        </div>
      )}

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