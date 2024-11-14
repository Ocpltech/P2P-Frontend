import React, { useState, useEffect } from 'react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { UPIPayment } from './UPIPayment';
import { BankTransfer } from './BankTransfer';
import { PaymentConfirmation } from './PaymentConfirmation';
import { PaymentMethod } from '../../types/payment';
import { SMSNotification } from '../../types/sms';

interface PaymentProcessorProps {
  amount: number;
  merchantId: string;
  merchantName: string;
  merchantVPA?: string;
  onSuccess: () => void;
  onCancel: () => void;
  smsNotifications?: SMSNotification[];
}

export function PaymentProcessor({
  amount,
  merchantId,
  merchantName,
  merchantVPA,
  onSuccess,
  onCancel,
  smsNotifications = []
}: PaymentProcessorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (selectedMethod) {
      setTransactionId(`TX${Date.now()}`);
    }
  }, [selectedMethod]);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handlePaymentInitiated = () => {
    setShowConfirmation(true);
  };

  const handlePaymentFailed = () => {
    setShowConfirmation(false);
    setSelectedMethod(null);
  };

  const renderPaymentMethod = () => {
    if (!selectedMethod) {
      return <PaymentMethodSelector onSelect={handleMethodSelect} amount={amount} />;
    }

    if (showConfirmation) {
      return (
        <PaymentConfirmation
          transactionId={transactionId}
          amount={amount}
          method={selectedMethod}
          onSuccess={onSuccess}
          onFailed={handlePaymentFailed}
          smsNotifications={smsNotifications}
        />
      );
    }

    switch (selectedMethod) {
      case 'upi':
        if (!merchantVPA) {
          return <div>UPI payments are not configured for this merchant</div>;
        }
        return (
          <UPIPayment
            amount={amount}
            merchantVPA={merchantVPA}
            merchantName={merchantName}
            transactionId={transactionId}
            onSuccess={handlePaymentInitiated}
          />
        );
      case 'imps':
      case 'neft':
      case 'rtgs':
        return (
          <BankTransfer
            amount={amount}
            type={selectedMethod}
            onSuccess={handlePaymentInitiated}
            smsNotifications={smsNotifications}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          ₹{amount.toLocaleString('en-IN')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Pay to: {merchantName}
        </p>
      </div>

      {renderPaymentMethod()}

      {selectedMethod && !showConfirmation && (
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedMethod(null)}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Choose Another Payment Method
          </button>
        </div>
      )}
    </div>
  );
}