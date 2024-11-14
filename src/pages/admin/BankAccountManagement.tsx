import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Dialog } from '../../components/ui/Dialog';
import { Toast } from '../../components/notifications/Toast';
import { mockBankAccounts } from '../../lib/mockData';
import { BankAccountForm } from '../../components/dashboard/BankAccountForm';
import { BankAccountList } from '../../components/dashboard/BankAccountList';
import { BulkOperations } from '../../components/transactions/BulkOperations';
import { useNavigate } from 'react-router-dom';

export function BankAccountManagement() {
  const navigate = useNavigate();
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const handleSubmit = (data: any) => {
    console.log('Bank account data:', data);
    setToastMessage(selectedAccount ? 'Bank account updated successfully' : 'Bank account added successfully');
    setShowToast(true);
    setIsAddBankOpen(false);
    setSelectedAccount(null);
  };

  const handleDelete = (accountId: string) => {
    setToastMessage('Bank account removed successfully');
    setShowToast(true);
  };

  const handleEdit = (account: any) => {
    setSelectedAccount(account);
    setIsAddBankOpen(true);
  };

  const handleViewTransactions = (accountId: string) => {
    navigate(`/admin/transactions?accountId=${accountId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bank Account Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage system-wide bank accounts and routing preferences
          </p>
        </div>
        <div className="flex space-x-4">
          <BulkOperations type="bank-accounts" />
          <button 
            className="btn-primary"
            onClick={() => {
              setSelectedAccount(null);
              setIsAddBankOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Bank Account
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bank accounts..."
            className="input-primary pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      <BankAccountList
        accounts={mockBankAccounts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewTransactions={handleViewTransactions}
        type="admin"
      />

      <Dialog
        isOpen={isAddBankOpen}
        onClose={() => {
          setIsAddBankOpen(false);
          setSelectedAccount(null);
        }}
        title={selectedAccount ? 'Edit Bank Account' : 'Add Bank Account'}
      >
        <BankAccountForm
          onSubmit={handleSubmit}
          initialData={selectedAccount}
          type="admin"
        />
      </Dialog>

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