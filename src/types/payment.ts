export type PaymentMethod = 'upi' | 'imps' | 'neft' | 'rtgs';

export interface CommissionStructure {
  method: PaymentMethod;
  percentage: number;
  fixedFee: number;
  minAmount: number;
  maxAmount: number;
  gst: number;
}

export interface Transaction {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: 'success' | 'pending' | 'failed';
  commission: {
    total: number;
    base: number;
    gst: number;
  };
  merchantId: string;
  customerName?: string;
  customerEmail?: string;
  bankAccount?: string;
  upiId?: string;
  createdAt: string;
  updatedAt: string;
  settlementStatus: 'pending' | 'processed' | 'failed';
  settlementId?: string;
}

export interface Settlement {
  id: string;
  merchantId: string;
  amount: number;
  transactionIds: string[];
  status: 'pending' | 'processed' | 'failed';
  processedAt?: string;
  bankAccount: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountHolder: string;
  };
  createdAt: string;
  updatedAt: string;
}