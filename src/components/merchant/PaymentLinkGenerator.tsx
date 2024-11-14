import React, { useState } from 'react';
import { QrCode, Copy, Link as LinkIcon } from 'lucide-react';
import { QRCodeGenerator } from '../qr/QRCodeGenerator';
import { Toast } from '../notifications/Toast';

interface PaymentLinkGeneratorProps {
  amount: number;
  merchantId: string;
  merchantName: string;
  description?: string;
  onGenerate: (data: {
    amount: number;
    description?: string;
    expiresIn?: number;
  }) => Promise<{ url: string; id: string }>;
}

export function PaymentLinkGenerator({
  amount,
  merchantId,
  merchantName,
  description,
  onGenerate
}: PaymentLinkGeneratorProps) {
  const [showQR, setShowQR] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [expiresIn, setExpiresIn] = useState(24); // hours

  const handleGenerate = async () => {
    try {
      const { url } = await onGenerate({
        amount,
        description,
        expiresIn: expiresIn * 3600 // convert to seconds
      });
      setPaymentUrl(url);
      setShowQR(true);
    } catch (error) {
      setToastMessage('Failed to generate payment link');
      setShowToast(true);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage('Payment link copied to clipboard');
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          ₹{amount.toLocaleString('en-IN')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description || `Payment to ${merchantName}`}
        </p>
      </div>

      {!showQR ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Link Expiry
            </label>
            <select
              className="mt-1 input-primary w-full"
              value={expiresIn}
              onChange={(e) => setExpiresIn(Number(e.target.value))}
            >
              <option value={1}>1 hour</option>
              <option value={6}>6 hours</option>
              <option value={12}>12 hours</option>
              <option value={24}>24 hours</option>
              <option value={48}>48 hours</option>
              <option value={72}>72 hours</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            className="btn-primary w-full"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Generate Payment Link
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center">
            <QRCodeGenerator
              value={paymentUrl}
              size={256}
              downloadEnabled={true}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="truncate flex-1 mr-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Payment Link
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {paymentUrl}
              </p>
            </div>
            <button
              onClick={() => handleCopy(paymentUrl)}
              className="flex-shrink-0 text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowQR(false)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Generate New Link
            </button>
          </div>
        </div>
      )}

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