import { SMSConfig, SMSNotification, SMSWebhook } from '../types/sms';
import { parseBankSMS } from '../utils/smsParser';

export class SMSService {
  private config: SMSConfig;

  constructor(config: SMSConfig) {
    this.config = config;
  }

  async setupWebhook(webhookUrl: string): Promise<void> {
    const response = await fetch(`${this.config.serverUrl}/webhooks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.config.username}:${this.config.password}`)
      },
      body: JSON.stringify({
        id: 'payment-notifications',
        url: webhookUrl,
        event: 'sms:received'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to setup webhook');
    }
  }

  async handleWebhook(data: SMSWebhook): Promise<SMSNotification | null> {
    const notification = parseBankSMS(data.payload.message);
    if (notification) {
      // You can add additional processing here
      return notification;
    }
    return null;
  }

  async removeWebhook(): Promise<void> {
    const response = await fetch(`${this.config.serverUrl}/webhooks/payment-notifications`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + btoa(`${this.config.username}:${this.config.password}`)
      }
    });

    if (!response.ok) {
      throw new Error('Failed to remove webhook');
    }
  }
}