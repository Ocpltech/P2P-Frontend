import React, { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { SMSNotification } from '../../types/sms';

interface SMSNotificationsProps {
  notifications: SMSNotification[];
  onDismiss: (notificationId: string) => void;
}

export function SMSNotifications({ notifications, onDismiss }: SMSNotificationsProps) {
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
                  {notification.bankName} - {notification.accountNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.date).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(notification.transactionId)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Check className="w-5 h-5" />
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
        </div>
      ))}

      {notifications.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No new notifications
        </div>
      )}
    </div>
  );
}