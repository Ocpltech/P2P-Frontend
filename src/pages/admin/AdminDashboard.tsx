import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { AdminOverview } from './AdminOverview';
import { MerchantManagement } from './MerchantManagement';
import { TransactionMonitoring } from './TransactionMonitoring';
import { BankAccountManagement } from './BankAccountManagement';
import { CommissionSettings } from './CommissionSettings';
import { PaymentRouting } from './PaymentRouting';
import { SMSIntegration } from './SMSIntegration';
import { SettlementManagement } from './SettlementManagement';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SystemSettings } from './SystemSettings';
import { useAuthStore } from '../../stores/authStore';

export function AdminDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <DashboardLayout userType="admin" userName={user?.name || ''}>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/merchants/*" element={<MerchantManagement />} />
        <Route path="/transactions" element={<TransactionMonitoring />} />
        <Route path="/bank-accounts" element={<BankAccountManagement />} />
        <Route path="/commissions" element={<CommissionSettings />} />
        <Route path="/routing" element={<PaymentRouting />} />
        <Route path="/sms" element={<SMSIntegration />} />
        <Route path="/settlements" element={<SettlementManagement />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/settings" element={<SystemSettings />} />
      </Routes>
    </DashboardLayout>
  );
}