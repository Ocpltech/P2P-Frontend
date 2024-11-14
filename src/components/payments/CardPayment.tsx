import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardPaymentProps {
  amount: number;
  onSuccess: () => void;
}

export function CardPayment({ amount, onSuccess }: CardPaymentProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : formattedValue
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber.replace(/\s/g, '').match(/^[0-9]{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Please enter the card holder name';
    }

    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!formData.cvv.match(/^[0-9]{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSuccess();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Number
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            name="cardNumber"
            maxLength={19}
            className={`input-primary pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Holder Name
        </label>
        <input
          type="text"
          name="cardHolder"
          className={`mt-1 input-primary ${errors.cardHolder ? 'border-red-500' : ''}`}
          placeholder="JOHN DOE"
          value={formData.cardHolder}
          onChange={handleInputChange}
        />
        {errors.cardHolder && (
          <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Expiry Date
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="expiryDate"
              maxLength={5}
              className={`input-primary pl-10 ${errors.expiryDate ? 'border-red-500' : ''}`}
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            CVV
          </label>
          <div className="mt-1 relative">
            <input
              type="password"
              name="cvv"
              maxLength={4}
              className={`input-primary pl-10 ${errors.cvv ? 'border-red-500' : ''}`}
              placeholder="123"
              value={formData.cvv}
              onChange={handleInputChange}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="saveCard"
          id="saveCard"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={formData.saveCard}
          onChange={handleInputChange}
        />
        <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Save card for future payments
        </label>
      </div>

      <div className="mt-6">
        <button type="submit" className="btn-primary w-full">
          Pay ₹{amount.toLocaleString('en-IN')}
        </button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your card information is encrypted and secure
        </p>
      </div>
    </motion.form>
  );
}