import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { MerchantOverview } from './MerchantOverview';
import { PaymentLinks } from './PaymentLinks';
import { Settlements } from './Settlements';
import { AccountSettings } from './AccountSettings';
import { MerchantAnalytics } from './Analytics';
import { TransactionDetails } from './TransactionDetails';
import { RefundManagement } from './RefundManagement';
import { DisputeManagement } from './DisputeManagement';
import { BankAccounts } from './BankAccounts';
import APIManagement from './APIManagement'; // Update import
import { useAuthStore } from '../../stores/authStore';

export function MerchantDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <DashboardLayout userType="merchant" userName={user?.name || ''}>
      <Routes>
        <Route path="/" element={<MerchantOverview />} />
        <Route path="/payment-links" element={<PaymentLinks />} />
        <Route path="/settlements" element={<Settlements />} />
        <Route path="/analytics" element={<MerchantAnalytics />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
        <Route path="/refunds" element={<RefundManagement />} />
        <Route path="/disputes" element={<DisputeManagement />} />
        <Route path="/bank-accounts" element={<BankAccounts />} />
        <Route path="/api" element={<APIManagement />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Routes>
    </DashboardLayout>
  );
}