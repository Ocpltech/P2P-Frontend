export type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  clientName: string;
  bankAccount: string;
}

export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  status: 'active' | 'inactive';
  balance: number;
  currency: string;
}

export interface AnalyticsSummary {
  totalTransactions: number;
  successRate: number;
  totalVolume: number;
  activeClients: number;
  monthlyGrowth: number;
  processingSpeed: number;
  failureRate: number;
}

export interface ChartData {
  date: string;
  value: number;
}