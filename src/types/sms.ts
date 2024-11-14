export interface SMSConfig {
  deviceId: string;
  username: string;
  password: string;
  serverUrl: string;
  isPrivateServer: boolean;
}

export interface SMSNotification {
  bankName: string;
  accountNumber: string;
  amount: number;
  transactionType: 'credit' | 'debit';
  transactionId: string;
  date: string;
  balance?: number;
}

export interface SMSWebhook {
  event: 'sms:received';
  payload: {
    message: string;
    phoneNumber: string;
    receivedAt: string;
  };
}