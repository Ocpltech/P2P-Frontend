import { SMSNotification } from '../types/sms';

const BANK_PATTERNS = {
  hdfc: {
    credit: /Credited with INR (?<amount>[\d,]+\.?\d*) on (?<date>[\d-]+) by .* Avl Bal INR (?<balance>[\d,]+\.?\d*)/i,
    debit: /Debited with INR (?<amount>[\d,]+\.?\d*) on (?<date>[\d-]+).* Avl Bal INR (?<balance>[\d,]+\.?\d*)/i
  },
  sbi: {
    credit: /Credited by (?:INR|Rs\.) (?<amount>[\d,]+\.?\d*) on (?<date>[\d-]+).* Bal:(?:INR|Rs\.) (?<balance>[\d,]+\.?\d*)/i,
    debit: /Debited by (?:INR|Rs\.) (?<amount>[\d,]+\.?\d*) on (?<date>[\d-]+).* Bal:(?:INR|Rs\.) (?<balance>[\d,]+\.?\d*)/i
  },
  icici: {
    credit: /(?:INR|Rs\.) (?<amount>[\d,]+\.?\d*) credited to (?<accountNumber>\d+) on (?<date>[\d-]+).* Bal: (?:INR|Rs\.) (?<balance>[\d,]+\.?\d*)/i,
    debit: /(?:INR|Rs\.) (?<amount>[\d,]+\.?\d*) debited from (?<accountNumber>\d+) on (?<date>[\d-]+).* Bal: (?:INR|Rs\.) (?<balance>[\d,]+\.?\d*)/i
  }
};

export function parseBankSMS(message: string): SMSNotification | null {
  for (const [bankName, patterns] of Object.entries(BANK_PATTERNS)) {
    for (const [type, pattern] of Object.entries(patterns)) {
      const match = message.match(pattern);
      if (match?.groups) {
        const { amount, date, balance, accountNumber } = match.groups;
        return {
          bankName,
          accountNumber: accountNumber || 'N/A',
          amount: parseFloat(amount.replace(/,/g, '')),
          transactionType: type as 'credit' | 'debit',
          transactionId: `tx_${Date.now()}`,
          date,
          balance: balance ? parseFloat(balance.replace(/,/g, '')) : undefined
        };
      }
    }
  }
  return null;
}