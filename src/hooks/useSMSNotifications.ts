import { useState, useEffect } from 'react';
import { SMSNotification } from '../types/sms';

export function useSMSNotifications(merchantId?: string) {
  const [notifications, setNotifications] = useState<SMSNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // In a real app, this would be an API call
        const response = await fetch('/api/sms-notifications' + (merchantId ? `?merchantId=${merchantId}` : ''));
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();

    // Set up polling every 10 seconds
    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [merchantId]);

  const dismissNotification = async (notificationId: string) => {
    try {
      // In a real app, this would be an API call
      await fetch(`/api/sms-notifications/${notificationId}`, {
        method: 'DELETE'
      });
      setNotifications(prev => prev.filter(n => n.transactionId !== notificationId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to dismiss notification'));
    }
  };

  return {
    notifications,
    isLoading,
    error,
    dismissNotification
  };
}