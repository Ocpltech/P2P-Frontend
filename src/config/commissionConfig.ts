import { CommissionStructure, PaymentMethod } from '../types/payment';

export const commissionStructures: Record<PaymentMethod, CommissionStructure> = {
  upi: {
    method: 'upi',
    percentage: 0.5, // 0.5%
    fixedFee: 0,
    minAmount: 1,
    maxAmount: 100000,
    gst: 18 // 18% GST
  },
  imps: {
    method: 'imps',
    percentage: 0.3,
    fixedFee: 5,
    minAmount: 1,
    maxAmount: 500000,
    gst: 18
  },
  neft: {
    method: 'neft',
    percentage: 0.2,
    fixedFee: 2.5,
    minAmount: 1,
    maxAmount: Infinity,
    gst: 18
  },
  rtgs: {
    method: 'rtgs',
    percentage: 0.1,
    fixedFee: 20,
    minAmount: 200000,
    maxAmount: Infinity,
    gst: 18
  }
};