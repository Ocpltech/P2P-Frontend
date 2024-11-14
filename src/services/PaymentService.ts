import { PaymentMethod, Transaction } from '../types/payment';
import { SMSNotification } from '../types/sms';
import { calculateMerchantCommission } from '../utils/merchantCommissionCalculator';

export class PaymentService {
  private transactions: Transaction[] = [];
  private smsNotifications: SMSNotification[] = [];

  constructor() {
    // Initialize with empty state
  }

  async createTransaction(
    amount: number,
    method: PaymentMethod,
    merchantId: string,
    customerDetails?: {
      name?: string;
      email?: string;
    }
  ): Promise<Transaction> {
    const transaction: Transaction = {
      id: `tx_${Date.now()}`,
      amount,
      method,
      status: 'pending',
      commission: {
        total: 0,
        base: 0,
        gst: 0
      },
      merchantId,
      customerName: customerDetails?.name,
      customerEmail: customerDetails?.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      settlementStatus: 'pending'
    };

    this.transactions.push(transaction);
    return transaction;
  }

  async confirmTransaction(transactionId: string, smsNotification: SMSNotification): Promise<Transaction> {
    const transaction = this.transactions.find(t => t.id === transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Verify amount matches
    if (transaction.amount !== smsNotification.amount) {
      throw new Error('Amount mismatch');
    }

    // Update transaction status
    transaction.status = 'success';
    transaction.updatedAt = new Date().toISOString();

    // Store SMS notification
    this.smsNotifications.push(smsNotification);

    return transaction;
  }

  async getTransaction(transactionId: string): Promise<Transaction | undefined> {
    return this.transactions.find(t => t.id === transactionId);
  }

  async getTransactions(merchantId?: string): Promise<Transaction[]> {
    if (merchantId) {
      return this.transactions.filter(t => t.merchantId === merchantId);
    }
    return this.transactions;
  }

  async getSMSNotifications(): Promise<SMSNotification[]> {
    return this.smsNotifications;
  }

  async dismissSMSNotification(transactionId: string): Promise<void> {
    const index = this.smsNotifications.findIndex(n => n.transactionId === transactionId);
    if (index !== -1) {
      this.smsNotifications.splice(index, 1);
    }
  }

  async calculateSettlement(merchantId: string, fromDate: string, toDate: string): Promise<{
    totalAmount: number;
    commission: number;
    netAmount: number;
    transactionIds: string[];
  }> {
    const transactions = this.transactions.filter(t => 
      t.merchantId === merchantId &&
      t.status === 'success' &&
      t.settlementStatus === 'pending' &&
      t.createdAt >= fromDate &&
      t.createdAt <= toDate
    );

    const totals = transactions.reduce((acc, t) => ({
      totalAmount: acc.totalAmount + t.amount,
      commission: acc.commission + t.commission.total,
      transactionIds: [...acc.transactionIds, t.id]
    }), {
      totalAmount: 0,
      commission: 0,
      transactionIds: [] as string[]
    });

    return {
      ...totals,
      netAmount: totals.totalAmount - totals.commission
    };
  }
}