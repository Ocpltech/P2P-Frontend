export type PaymentMethod = 'upi' | 'imps' | 'neft' | 'rtgs';

export interface MerchantCommission {
  merchantId: string;
  commissions: {
    [key in PaymentMethod]: {
      percentage: number;
      fixedFee: number;
      gst: number;
      minAmount: number;
      maxAmount: number;
      enabled: boolean;
    };
  };
  specialRates?: {
    volumeBasedDiscounts: {
      minVolume: number;
      discountPercentage: number;
    }[];
    customCategories?: {
      category: string;
      percentage: number;
      fixedFee: number;
    }[];
  };
  effectiveFrom: string;
  updatedAt: string;
  updatedBy: string;
}