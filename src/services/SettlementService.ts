import { Settlement, Transaction } from '../types/payment';
import { SMSNotification } from '../types/sms';

export class SettlementService {
  private settlements: Settlement[] = [];

  async createSettlement(
    merchantId: string,
    amount: number,
    transactionIds: string[],
    bankAccount: {
      accountNumber: string;
      ifscCode: string;
      bankName: string;
      accountHolder: string;
    }
  ): Promise<Settlement> {
    const settlement: Settlement = {
      id: `stl_${Date.now()}`,
      merchantId,
      amount,
      transactionIds,
      status: 'pending',
      bankAccount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.settlements.push(settlement);
    return settlement;
  }

  async confirmSettlement(settlementId: string, smsNotification: SMSNotification): Promise<Settlement> {
    const settlement = this.settlements.find(s => s.id === settlementId);
    if (!settlement) {
      throw new Error('Settlement not found');
    }

    // Verify amount matches
    if (settlement.amount !== smsNotification.amount) {
      throw new Error('Amount mismatch');
    }

    // Update settlement status
    settlement.status = 'processed';
    settlement.processedAt = new Date().toISOString();
    settlement.updatedAt = new Date().toISOString();

    return settlement;
  }

  async getSettlement(settlementId: string): Promise<Settlement | undefined> {
    return this.settlements.find(s => s.id === settlementId);
  }

  async getSettlements(merchantId?: string): Promise<Settlement[]> {
    if (merchantId) {
      return this.settlements.filter(s => s.merchantId === merchantId);
    }
    return this.settlements;
  }

  async getPendingSettlements(): Promise<Settlement[]> {
    return this.settlements.filter(s => s.status === 'pending');
  }
}