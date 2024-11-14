import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, RefreshCw } from 'lucide-react';
import { Transaction } from '../../types/payment';
import { SMSNotification } from '../../types/sms';
import { TransactionList } from '../transactions/TransactionList';
import { Toast } from '../notifications/Toast';

interface TransactionMonitoringProps {
  smsNotifications: SMSNotification[];
}

export function TransactionMonitoring({ smsNotifications }: TransactionMonitoringProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'success' | 'failed'>('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Monitor SMS notifications for payment confirmations
  useEffect(() => {
    const handleSMSNotification = (notification: SMSNotification) => {
      // Update transaction status based on SMS
      setTransactions(prevTransactions => 
        prevTransactions.map(transaction => {
          if (transaction.amount === notification.amount && 
              notification.transactionType === 'credit') {
            return {
              ...transaction,
              status: 'success',
              updatedAt: new Date().toISOString()
            };
          }
          return transaction;
        })
      );

      setToastMessage(`Payment confirmed: ₹${notification.amount.toLocaleString('en-IN')}`);
      setShowToast(true);
    };

    smsNotifications.forEach(handleSMSNotification);
  }, [smsNotifications]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // In a real app, this would fetch from your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsRefreshing(false);
    } catch (error) {
      setToastMessage('Failed to refresh transactions');
      setShowToast(true);
      setIsRefreshing(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.customerName?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Transaction Monitoring
        </h2>
        <button
          onClick={handleRefresh}
          className="btn-secondary"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="input-primary pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="input-primary min-w-[150px]"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
        <button className="btn-secondary">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </button>
      </div>

      {/* Pending Transactions Alert */}
      {transactions.some(t => t.status === 'pending') && (
        <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            Some transactions are pending confirmation. SMS notifications will automatically update their status.
          </div>
        </div>
      )}

      <TransactionList transactions={filteredTransactions} />

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