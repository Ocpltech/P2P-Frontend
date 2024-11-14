import React, { useState, useEffect } from 'react';
import { MessageSquare, RefreshCw, AlertTriangle } from 'lucide-react';
import { SMSNotification } from '../../types/sms';
import { Toast } from '../notifications/Toast';

interface SMSMonitoringProps {
  notifications: SMSNotification[];
  onDismiss: (notificationId: string) => void;
}

export function SMSMonitoring({ notifications, onDismiss }: SMSMonitoringProps) {
  const [showToast, setShowToast] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // In a real app, this would fetch new notifications
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastRefresh(new Date());
      setIsRefreshing(false);
    } catch (error) {
      setShowToast(true);
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(handleRefresh, 30000);
    return () => clearInterval(interval);
  }, []);

  const pendingCredits = notifications.filter(
    n => n.transactionType === 'credit' && !n.balance
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            SMS Notifications
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="btn-secondary"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {pendingCredits.length > 0 && (
        <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            {pendingCredits.length} pending credit notification{pendingCredits.length !== 1 ? 's' : ''} waiting for confirmation
          </div>
        </div>
      )}

      <div className="grid gap-4">
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
                  <MessageSquare className={`w-5 h-5 ${
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
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Dismiss
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                <p className={`text-sm font-medium ${
                  notification.transactionType === 'credit'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {notification.transactionType === 'credit' ? '+' : '-'}
                  ₹{notification.amount.toLocaleString('en-IN')}
                </p>
              </div>
              {notification.balance !== undefined && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Balance</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ₹{notification.balance.toLocaleString('en-IN')}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {new Date(notification.date).toLocaleString()}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              New SMS notifications will appear here
            </p>
          </div>
        )}
      </div>

      {showToast && (
        <Toast
          type="error"
          message="Failed to refresh notifications"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}