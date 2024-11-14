import { PaymentMethod, Transaction } from '../types/payment';
import { SMSNotification } from '../types/sms';

export class PaymentConfirmationService {
  private pendingTransactions: Map<string, {
    amount: number;
    method: PaymentMethod;
    timeout: NodeJS.Timeout;
    onSuccess: () => void;
    onFailed: () => void;
  }> = new Map();

  waitForConfirmation(
    transactionId: string,
    amount: number,
    method: PaymentMethod,
    onSuccess: () => void,
    onFailed: () => void
  ) {
    // Clear any existing timeout for this transaction
    this.clearTransaction(transactionId);

    // Set up new timeout based on payment method
    const timeoutDuration = method === 'imps' || method === 'upi' ? 300000 : 3600000;
    const timeout = setTimeout(() => {
      onFailed();
      this.clearTransaction(transactionId);
    }, timeoutDuration);

    // Store transaction details
    this.pendingTransactions.set(transactionId, {
      amount,
      method,
      timeout,
      onSuccess,
      onFailed
    });
  }

  handleSMSNotification(notification: SMSNotification) {
    // Find matching pending transaction
    for (const [transactionId, transaction] of this.pendingTransactions.entries()) {
      if (
        notification.amount === transaction.amount &&
        notification.transactionType === 'credit'
      ) {
        // Call success callback
        transaction.onSuccess();
        // Clear transaction
        this.clearTransaction(transactionId);
        return true;
      }
    }
    return false;
  }

  private clearTransaction(transactionId: string) {
    const transaction = this.pendingTransactions.get(transactionId);
    if (transaction) {
      clearTimeout(transaction.timeout);
      this.pendingTransactions.delete(transactionId);
    }
  }

  clearAll() {
    for (const [transactionId] of this.pendingTransactions) {
      this.clearTransaction(transactionId);
    }
  }
}