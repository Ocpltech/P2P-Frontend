import { BankAccount } from '../types/bank';
import { PaymentMethod, Transaction } from '../types/payment';
import { BankAccountService } from './BankAccountService';

export class PaymentRoutingService {
  constructor(private bankAccountService: BankAccountService) {}

  async findOptimalAccount(
    amount: number,
    method: PaymentMethod,
    merchantId?: string
  ): Promise<BankAccount | null> {
    const availableAccounts = await this.bankAccountService.getAvailableAccounts(
      amount,
      method,
      merchantId
    );

    if (availableAccounts.length === 0) {
      return null;
    }

    // Check for online devices
    for (const account of availableAccounts) {
      const onlineDevices = await this.bankAccountService.getOnlineDevices(account.id);
      if (onlineDevices.length > 0) {
        return account;
      }
    }

    return null;
  }

  async generatePaymentIntent(
    transaction: Transaction,
    account: BankAccount
  ): Promise<{
    deepLink: string;
    qrCode?: string;
    bankAccount: BankAccount;
  }> {
    // Generate payment intent based on method
    switch (transaction.method) {
      case 'upi':
        const upiId = account.upiHandles[0];
        const deepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(account.accountHolder)}&am=${transaction.amount}&tr=${transaction.id}`;
        const qrCode = deepLink;
        return { deepLink, qrCode, bankAccount: account };

      case 'imps':
      case 'neft':
      case 'rtgs':
        return {
          deepLink: `bank://${account.bankName.toLowerCase()}/transfer?account=${account.accountNumber}&ifsc=${account.ifscCode}&amount=${transaction.amount}&ref=${transaction.id}`,
          bankAccount: account
        };

      default:
        throw new Error(`Unsupported payment method: ${transaction.method}`);
    }
  }

  async handleDeviceStatus(
    deviceId: string,
    status: 'online' | 'offline',
    metadata: {
      batteryLevel: number;
      networkType: string;
      lastSeen: string;
    }
  ): Promise<void> {
    await this.bankAccountService.updateDeviceStatus(deviceId, status, metadata);

    // Notify webhooks if device goes offline
    if (status === 'offline') {
      const device = (await this.bankAccountService.getAccountDevices(deviceId))[0];
      if (device) {
        await this.bankAccountService.notifyWebhooks(
          device.bankAccountId,
          'device.offline',
          { deviceId, ...metadata }
        );
      }
    }
  }
}