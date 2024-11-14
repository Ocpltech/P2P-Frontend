import { useState, useEffect } from 'react';
import { PaymentMethod } from '../types/payment';
import { SMSNotification } from '../types/sms';

interface PaymentStatus {
  status: 'pending' | 'success' | 'failed';
  message?: string;
}

export function usePaymentStatus(
  transactionId: string,
  amount: number,
  method: PaymentMethod,
  smsNotifications: SMSNotification[] = []
) {
  const [status, setStatus] = useState<PaymentStatus>({ status: 'pending' });

  useEffect(() => {
    // Check for matching SMS notification
    const matchingNotification = smsNotifications.find(
      notification => notification.amount === amount && notification.transactionType === 'credit'
    );

    if (matchingNotification) {
      setStatus({
        status: 'success',
        message: 'Payment confirmed via bank notification'
      });
      return;
    }

    // Set up timeout based on payment method
    const timeout = setTimeout(() => {
      if (status.status === 'pending') {
        setStatus({
          status: 'failed',
          message: 'Payment confirmation timeout'
        });
      }
    }, method === 'upi' || method === 'imps' ? 300000 : 3600000); // 5 mins for UPI/IMPS, 1 hour for others

    return () => clearTimeout(timeout);
  }, [amount, method, smsNotifications, status.status]);

  return status;
}