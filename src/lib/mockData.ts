import { Transaction, BankAccount, AnalyticsSummary, ChartData } from '../types/dashboard';

export const mockTransactions: Transaction[] = [
  {
    id: 'tx_1',
    amount: 85000.00,
    currency: 'INR',
    status: 'success',
    date: '2024-03-15T10:30:00Z',
    clientName: 'TechCorp India Ltd',
    bankAccount: 'HDFC Bank ****1234'
  },
  {
    id: 'tx_2',
    amount: 65000.50,
    currency: 'INR',
    status: 'pending',
    date: '2024-03-15T09:45:00Z',
    clientName: 'Infosys Solutions',
    bankAccount: 'ICICI Bank ****5678'
  },
  {
    id: 'tx_3',
    amount: 125000.00,
    currency: 'INR',
    status: 'failed',
    date: '2024-03-15T08:15:00Z',
    clientName: 'Reliance Digital',
    bankAccount: 'SBI ****9012'
  },
  {
    id: 'tx_4',
    amount: 250000.00,
    currency: 'INR',
    status: 'success',
    date: '2024-03-15T07:30:00Z',
    clientName: 'Tata Ventures',
    bankAccount: 'HDFC Bank ****1234'
  },
  {
    id: 'tx_5',
    amount: 95000.00,
    currency: 'INR',
    status: 'success',
    date: '2024-03-15T06:45:00Z',
    clientName: 'Wipro Technologies',
    bankAccount: 'Axis Bank ****5678'
  }
];

export const mockBankAccounts: BankAccount[] = [
  {
    id: 'ba_1',
    name: 'HDFC Business Account',
    accountNumber: '****1234',
    status: 'active',
    balance: 2500000.00,
    currency: 'INR'
  },
  {
    id: 'ba_2',
    name: 'ICICI Business',
    accountNumber: '****5678',
    status: 'active',
    balance: 1800000.00,
    currency: 'INR'
  }
];

export const mockAnalytics: AnalyticsSummary = {
  totalTransactions: 1250,
  successRate: 98.5,
  totalVolume: 75000000.00,
  activeClients: 45,
  monthlyGrowth: 15.5,
  processingSpeed: 250,
  failureRate: 1.5
};

const today = new Date();
export const mockChartData: ChartData[] = Array.from({ length: 7 }).map((_, index) => {
  const date = new Date(today);
  date.setDate(date.getDate() - (6 - index));
  return {
    date: date.toISOString().split('T')[0],
    value: Math.floor(Math.random() * 1500000) + 1000000 // Higher values for INR
  };
});