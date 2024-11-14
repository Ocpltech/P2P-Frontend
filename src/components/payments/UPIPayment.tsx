import React, { useState } from 'react';
import { QRCodeGenerator } from '../qr/QRCodeGenerator';
import { Copy, QrCode, Smartphone } from 'lucide-react';
import { Toast } from '../notifications/Toast';

interface UPIPaymentProps {
  amount: number;
  merchantVPA: string;
  merchantName: string;
  transactionId: string;
  onSuccess: () => void;
}

export function UPIPayment({
  amount,
  merchantVPA,
  merchantName,
  transactionId,
  onSuccess
}: UPIPaymentProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const upiUrl = `upi://pay?pa=${merchantVPA}&pn=${encodeURIComponent(merchantName)}&am=${amount}&tr=${transactionId}&cu=INR`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(merchantVPA);
    setToastMessage('UPI ID copied to clipboard');
    setShowToast(true);
  };

  const handleOpenApp = () => {
    window.location.href = upiUrl;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <QRCodeGenerator
          value={upiUrl}
          size={256}
          downloadEnabled={true}
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Scan QR code with any UPI app
        </p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {merchantVPA}
          </span>
          <button
            onClick={handleCopyUPI}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleOpenApp}
          className="btn-primary"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Open UPI App
        </button>
      </div>

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