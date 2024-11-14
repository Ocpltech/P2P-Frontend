import React, { useState } from 'react';
import { Building2, Copy, AlertTriangle } from 'lucide-react';
import { Toast } from '../notifications/Toast';
import { BankSelector } from './BankSelector';
import { PaymentConfirmation } from './PaymentConfirmation';
import { SMSNotification } from '../../types/sms';

interface BankTransferProps {
  amount: number;
  type: 'imps' | 'neft' | 'rtgs';
  onSuccess: () => void;
  smsNotifications?: SMSNotification[];
}

export function BankTransfer({ 
  amount, 
  type, 
  onSuccess,
  smsNotifications = []
}: BankTransferProps) {
  const [selectedBank, setSelectedBank] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    // Generate a unique transaction ID
    setTransactionId(`TX${Date.now()}`);
    setShowConfirmation(true);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} copied to clipboard`);
    setShowToast(true);
  };

  const handlePaymentFailed = () => {
    setShowConfirmation(false);
    setSelectedBank('');
  };

  if (showConfirmation) {
    return (
      <PaymentConfirmation
        transactionId={transactionId}
        amount={amount}
        method={type}
        onSuccess={onSuccess}
        onFailed={handlePaymentFailed}
        smsNotifications={smsNotifications}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {type.toUpperCase()} Transfer
        </h3>
        <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
          {type === 'imps' && 'Instant transfer available 24x7'}
          {type === 'neft' && 'Batch processing every 30 minutes'}
          {type === 'rtgs' && 'Real-time transfer for high value transactions'}
        </p>
      </div>

      <BankSelector onSelect={handleBankSelect} />

      {showToast && (
        <Toast
          type="success"
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}