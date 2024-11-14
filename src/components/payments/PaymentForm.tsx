import React, { useState } from 'react';
import { PaymentMethods } from './PaymentMethods';
import { UPIPayment } from './UPIPayment';
import { BankTransfer } from './BankTransfer';
import { PaymentStatus } from './PaymentStatus';
import { Dialog } from '../ui/Dialog';

interface PaymentFormProps {
  amount: number;
  merchantName: string;
  merchantVPA: string;
  onSuccess: () => void;
  onClose: () => void;
}

export function PaymentForm({
  amount,
  merchantName,
  merchantVPA,
  onSuccess,
  onClose
}: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'imps' | 'neft' | 'rtgs' | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending' | null>(null);
  const transactionId = `tx_${Date.now()}`;

  const handlePaymentComplete = () => {
    setPaymentStatus('pending');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      setPaymentStatus(isSuccess ? 'success' : 'failed');
      if (isSuccess) {
        onSuccess();
      }
    }, 2000);
  };

  const renderContent = () => {
    if (paymentStatus) {
      return (
        <PaymentStatus
          status={paymentStatus}
          amount={amount}
          transactionId={transactionId}
          onClose={onClose}
        />
      );
    }

    if (!selectedMethod) {
      return <PaymentMethods onSelect={setSelectedMethod} amount={amount} />;
    }

    switch (selectedMethod) {
      case 'upi':
        return (
          <UPIPayment
            amount={amount}
            merchantVPA={merchantVPA}
            merchantName={merchantName}
            transactionId={transactionId}
            onSuccess={handlePaymentComplete}
          />
        );
      case 'imps':
      case 'neft':
      case 'rtgs':
        return (
          <BankTransfer
            amount={amount}
            type={selectedMethod}
            onSuccess={handlePaymentComplete}
          />
        );
    }
  };

  return (
    <Dialog
      isOpen={true}
      onClose={onClose}
      title={paymentStatus ? 'Payment Status' : 'Choose Payment Method'}
    >
      <div className="space-y-6">
        {!paymentStatus && (
          <div className="text-center mb-6">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{amount.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pay to: {merchantName}
            </p>
          </div>
        )}

        {renderContent()}

        {selectedMethod && !paymentStatus && (
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
    </Dialog>
  );
}