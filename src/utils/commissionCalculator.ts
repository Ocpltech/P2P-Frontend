import { PaymentMethod } from '../types/payment';
import { commissionStructures } from '../config/commissionConfig';

export function calculateCommission(amount: number, method: PaymentMethod) {
  const structure = commissionStructures[method];
  
  // Calculate base commission
  const percentageAmount = (amount * structure.percentage) / 100;
  const baseCommission = percentageAmount + structure.fixedFee;
  
  // Calculate GST
  const gstAmount = (baseCommission * structure.gst) / 100;
  
  // Calculate total commission
  const totalCommission = baseCommission + gstAmount;
  
  return {
    base: baseCommission,
    gst: gstAmount,
    total: totalCommission,
    merchantReceives: amount - totalCommission
  };
}