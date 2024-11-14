import React, { useState } from 'react';
import { Plus, Upload, Download, Building2, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '../ui/Dialog';
import { Toast } from '../notifications/Toast';
import { BulkTransactionUpload } from '../transactions/BulkTransactionUpload';
import { TransactionExport } from '../transactions/TransactionExport';

interface QuickActionsProps {
  onCreateTransaction: () => void;
  userType: 'admin' | 'merchant';
}

export function QuickActions({ onCreateTransaction, userType }: QuickActionsProps) {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleBulkUpload = (file: File) => {
    // In a real app, this would handle the file upload
    console.log('Uploading file:', file);
    setToastMessage('Transactions uploaded successfully');
    setShowToast(true);
  };

  const handleExport = (format: 'csv' | 'excel', dateRange: { start: string; end: string }) => {
    // In a real app, this would trigger an API call
    console.log('Exporting data:', { format, dateRange });
    setToastMessage('Export started. You will be notified when ready.');
    setShowToast(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onCreateTransaction}
          className="col-span-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Transaction
        </button>
        
        <BulkTransactionUpload onUpload={handleBulkUpload} />
        
        <TransactionExport onExport={handleExport} />
        
        <button 
          onClick={() => navigate(`/${userType}/bank-accounts`)}
          className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
        >
          <Building2 className="w-5 h-5 mr-2" />
          Bank Accounts
        </button>
        
        <button 
          onClick={() => navigate(`/${userType}/analytics`)}
          className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
        >
          <BarChart3 className="w-5 h-5 mr-2" />
          Analytics
        </button>
      </div>

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