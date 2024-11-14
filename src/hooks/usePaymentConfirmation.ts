import { useState, useEffect } from 'react';
import { PaymentMethod } from '../types/payment';
import { SMSNotification } from '../types/sms';

interface PaymentConfirmationState {
  status: 'pending' | 'success' | 'failed';
  timeElapsed: number;
  matchedNotification?: SMSNotification;
}

export function usePaymentConfirmation(
  amount: number,
  method: PaymentMethod,
  smsNotifications: SMSNotification[] = []
) {
  const [state, setState] = useState<PaymentConfirmationState>({
    status: 'pending',
    timeElapsed: 0
  });

  useEffect(() => {
    // Check for matching SMS notification
    const matchingNotification = smsNotifications.find(
      notification => notification.amount === amount && notification.transactionType === 'credit'
    );

    if (matchingNotification) {
      setState({
        status: 'success',
        timeElapsed: state.timeElapsed,
        matchedNotification: matchingNotification
      });
      return;
    }

    // Set up timeout based on payment method
    const timeoutDuration = method === 'imps' || method === 'upi' ? 300000 : 3600000; // 5 mins for IMPS/UPI, 1 hour for others
    const timeout = setTimeout(() => {
      if (state.status === 'pending') {
        setState(prev => ({
          ...prev,
          status: 'failed'
        }));
      }
    }, timeoutDuration);

    // Update elapsed time
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [amount, method, smsNotifications, state.status, state.timeElapsed]);

  return state;
}