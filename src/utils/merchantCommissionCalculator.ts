import { PaymentMethod, MerchantCommission } from '../types/commission';

export function calculateMerchantCommission(
  amount: number,
  method: PaymentMethod,
  merchantCommission: MerchantCommission,
  monthlyVolume: number = 0
) {
  const methodSettings = merchantCommission.commissions[method];
  
  if (!methodSettings.enabled) {
    throw new Error(`${method.toUpperCase()} payments are not enabled for this merchant`);
  }

  // Check amount limits
  if (amount < methodSettings.minAmount || amount > methodSettings.maxAmount) {
    throw new Error(`Amount is outside the allowed range for ${method.toUpperCase()}`);
  }

  // Calculate base commission
  let commissionPercentage = methodSettings.percentage;

  // Apply volume-based discounts if applicable
  if (merchantCommission.specialRates?.volumeBasedDiscounts) {
    const applicableDiscount = merchantCommission.specialRates.volumeBasedDiscounts
      .filter(discount => monthlyVolume >= discount.minVolume)
      .sort((a, b) => b.minVolume - a.minVolume)[0];

    if (applicableDiscount) {
      commissionPercentage -= applicableDiscount.discountPercentage;
    }
  }

  // Calculate commission components
  const percentageAmount = (amount * commissionPercentage) / 100;
  const baseCommission = percentageAmount + methodSettings.fixedFee;
  
  // Calculate GST
  const gstAmount = (baseCommission * methodSettings.gst) / 100;
  
  // Calculate total commission
  const totalCommission = baseCommission + gstAmount;
  
  return {
    base: baseCommission,
    gst: gstAmount,
    total: totalCommission,
    merchantReceives: amount - totalCommission,
    effectiveRate: (totalCommission / amount) * 100,
    appliedPercentage: commissionPercentage
  };
}