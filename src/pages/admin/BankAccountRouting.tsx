import React from 'react';
import { BankRoutingRules } from './BankRoutingRules';
import { BankAccountManagement } from './BankAccountManagement';
import { Tabs } from '../../components/ui/Tabs';

export function BankAccountRouting() {
  const tabs = [
    { id: 'accounts', label: 'Bank Accounts', content: <BankAccountManagement /> },
    { id: 'rules', label: 'Routing Rules', content: <BankRoutingRules /> }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bank Account Routing</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage bank accounts and configure routing rules
        </p>
      </div>

      <Tabs tabs={tabs} defaultTab="accounts" />
    </div>
  );
}