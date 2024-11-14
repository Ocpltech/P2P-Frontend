import { PaymentMethod } from './payment';

export interface BankAccount {
  id: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolder: string;
  branchName: string;
  upiEnabled: boolean;
  upiHandles: string[];
  status: 'active' | 'inactive';
  type: 'savings' | 'current';
  merchantId?: string; // For merchant accounts
  adminId?: string; // For admin accounts
  limits: {
    daily: number;
    perTransaction: number;
    monthly: number;
  };
  balanceThresholds: {
    minimum: number;
    maximum: number;
  };
  supportedMethods: PaymentMethod[];
  routingPriority: number;
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankDevice {
  id: string;
  bankAccountId: string;
  deviceId: string;
  phoneNumber: string;
  status: 'online' | 'offline';
  lastSeen: string;
  batteryLevel: number;
  networkType: string;
  appVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankWebhook {
  id: string;
  bankAccountId: string;
  url: string;
  secret: string;
  events: WebhookEvent[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export type WebhookEvent = 
  | 'payment.success'
  | 'payment.failed'
  | 'payment.pending'
  | 'account.low_balance'
  | 'device.offline';