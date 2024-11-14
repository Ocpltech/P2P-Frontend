import { BankAccount, BankDevice, BankWebhook } from '../types/bank';
import { PaymentMethod } from '../types/payment';

export class BankAccountService {
  private bankAccounts: BankAccount[] = [];
  private devices: BankDevice[] = [];
  private webhooks: BankWebhook[] = [];

  async addBankAccount(
    accountData: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<BankAccount> {
    const account: BankAccount = {
      ...accountData,
      id: `ba_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.bankAccounts.push(account);
    return account;
  }

  async registerDevice(
    bankAccountId: string,
    deviceData: Omit<BankDevice, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<BankDevice> {
    const device: BankDevice = {
      ...deviceData,
      id: `dev_${Date.now()}`,
      bankAccountId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.devices.push(device);
    return device;
  }

  async registerWebhook(
    bankAccountId: string,
    webhookData: Omit<BankWebhook, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<BankWebhook> {
    const webhook: BankWebhook = {
      ...webhookData,
      id: `wh_${Date.now()}`,
      bankAccountId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.webhooks.push(webhook);
    return webhook;
  }

  async getAvailableAccounts(
    amount: number,
    method: PaymentMethod,
    merchantId?: string
  ): Promise<BankAccount[]> {
    return this.bankAccounts.filter(account => {
      const isActive = account.status === 'active';
      const supportsMethod = account.supportedMethods.includes(method);
      const withinLimits = amount <= account.limits.perTransaction;
      const forMerchant = merchantId ? account.merchantId === merchantId : true;
      
      return isActive && supportsMethod && withinLimits && forMerchant;
    }).sort((a, b) => a.routingPriority - b.routingPriority);
  }

  async getAccountDevices(bankAccountId: string): Promise<BankDevice[]> {
    return this.devices.filter(device => device.bankAccountId === bankAccountId);
  }

  async getOnlineDevices(bankAccountId: string): Promise<BankDevice[]> {
    return this.devices.filter(
      device => device.bankAccountId === bankAccountId && device.status === 'online'
    );
  }

  async updateDeviceStatus(
    deviceId: string,
    status: 'online' | 'offline',
    metadata: Partial<BankDevice>
  ): Promise<BankDevice> {
    const device = this.devices.find(d => d.id === deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    Object.assign(device, {
      ...metadata,
      status,
      lastSeen: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return device;
  }

  async notifyWebhooks(
    bankAccountId: string,
    event: WebhookEvent,
    data: any
  ): Promise<void> {
    const webhooks = this.webhooks.filter(
      webhook => webhook.bankAccountId === bankAccountId &&
                webhook.status === 'active' &&
                webhook.events.includes(event)
    );

    await Promise.all(webhooks.map(webhook => 
      fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': webhook.secret
        },
        body: JSON.stringify({
          event,
          data,
          timestamp: new Date().toISOString()
        })
      })
    ));
  }
}