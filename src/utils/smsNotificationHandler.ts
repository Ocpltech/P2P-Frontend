import { SMSNotification } from '../types/sms';
import { Transaction } from '../types/payment';

export function matchSMSToTransaction(
  notification: SMSNotification,
  transactions: Transaction[]
): Transaction | undefined {
  // Find pending transaction with matching amount
  return transactions.find(transaction => 
    transaction.status === 'pending' &&
    transaction.amount === notification.amount &&
    // Check if transaction is recent (within last 24 hours)
    new Date(transaction.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
  );
}

export function validateSMSNotification(notification: SMSNotification): boolean {
  // Validate notification format and data
  if (!notification.amount || !notification.transactionId || !notification.date) {
    return false;
  }

  // Validate amount is positive
  if (notification.amount <= 0) {
    return false;
  }

  // Validate date is not in future
  if (new Date(notification.date) > new Date()) {
    return false;
  }

  return true;
}