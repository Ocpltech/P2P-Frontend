import React, { useState } from 'react';
import { Search, Filter, Plus, Building2, CheckCircle2, XCircle, MoreVertical, AlertTriangle } from 'lucide-react';
import { Dialog } from '../../components/ui/Dialog';
import { Toast } from '../../components/notifications/Toast';
import { MerchantForm } from '../../components/admin/MerchantForm';
import { KYCVerification } from '../../components/admin/KYCVerification';

interface Merchant {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  transactionVolume: number;
  successRate: number;
  onboardingDate: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  businessType: string;
  gstNumber: string;
  bankAccounts: {
    id: string;
    bankName: string;
    accountNumber: string;
    status: 'active' | 'inactive';
  }[];
}

const mockMerchants: Merchant[] = [
  {
    id: 'merch_1',
    name: 'TechCorp India Ltd',
    email: 'accounts@techcorp.in',
    status: 'active',
    transactionVolume: 15000000,
    successRate: 98.5,
    onboardingDate: '2024-01-15',
    kycStatus: 'verified',
    businessType: 'Technology',
    gstNumber: '27AADCB2230M1Z3',
    bankAccounts: [
      {
        id: 'ba_1',
        bankName: 'HDFC Bank',
        accountNumber: '****1234',
        status: 'active'
      }
    ]
  },
  {
    id: 'merch_2',
    name: 'Digital Solutions Pvt Ltd',
    email: 'finance@digitalsolutions.in',
    status: 'pending',
    transactionVolume: 8500000,
    successRate: 97.2,
    onboardingDate: '2024-02-01',
    kycStatus: 'pending',
    businessType: 'Services',
    gstNumber: '29AADCS1234M1Z4',
    bankAccounts: []
  }
];

export function MerchantManagement() {
  const [merchants, setMerchants] = useState(mockMerchants);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleCreateMerchant = async (data: any) => {
    try {
      // In a real app, this would be an API call
      const newMerchant: Merchant = {
        id: `merch_${Date.now()}`,
        ...data,
        status: 'pending',
        transactionVolume: 0,
        successRate: 0,
        onboardingDate: new Date().toISOString(),
        kycStatus: 'pending',
        bankAccounts: []
      };
      
      setMerchants([...merchants, newMerchant]);
      setToastMessage('Merchant created successfully');
      setToastType('success');
      setIsCreateModalOpen(false);
    } catch (error) {
      setToastMessage('Failed to create merchant');
      setToastType('error');
    }
    setShowToast(true);
  };

  const handleKYCVerification = async (merchantId: string, status: 'verified' | 'rejected', remarks?: string) => {
    try {
      setMerchants(merchants.map(merchant => 
        merchant.id === merchantId
          ? { ...merchant, kycStatus: status }
          : merchant
      ));
      setToastMessage(`KYC ${status === 'verified' ? 'verified' : 'rejected'} successfully`);
      setToastType('success');
      setShowKYCModal(false);
    } catch (error) {
      setToastMessage('Failed to update KYC status');
      setToastType('error');
    }
    setShowToast(true);
  };

  const handleStatusChange = async (merchantId: string, status: 'active' | 'inactive') => {
    try {
      setMerchants(merchants.map(merchant => 
        merchant.id === merchantId
          ? { ...merchant, status }
          : merchant
      ));
      setToastMessage(`Merchant ${status === 'active' ? 'activated' : 'deactivated'} successfully`);
      setToastType('success');
    } catch (error) {
      setToastMessage(`Failed to ${status === 'active' ? 'activate' : 'deactivate'} merchant`);
      setToastType('error');
    }
    setShowToast(true);
  };

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.gstNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Merchant Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and monitor merchant accounts
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Merchant
        </button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchants..."
            className="input-primary pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <select className="input-primary min-w-[150px]">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredMerchants.map((merchant) => (
          <div
            key={merchant.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    {merchant.name}
                  </h2>
                  <div className="mt-1 flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {merchant.email}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      merchant.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : merchant.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {merchant.status === 'active' ? (
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-1" />
                      )}
                      {merchant.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setSelectedMerchant(merchant);
                    setShowKYCModal(true);
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    merchant.kycStatus === 'verified'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : merchant.kycStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}
                >
                  KYC {merchant.kycStatus}
                </button>
                <button
                  onClick={() => handleStatusChange(
                    merchant.id,
                    merchant.status === 'active' ? 'inactive' : 'active'
                  )}
                  className="btn-secondary"
                >
                  {merchant.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Transaction Volume
                </h3>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  ₹{merchant.transactionVolume.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Success Rate
                </h3>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {merchant.successRate}%
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Business Type
                </h3>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {merchant.businessType}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  GST Number
                </h3>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {merchant.gstNumber}
                </p>
              </div>
            </div>

            {merchant.bankAccounts.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Bank Accounts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {merchant.bankAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {account.bankName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {account.accountNumber}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          account.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {account.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  No bank accounts configured
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Merchant"
      >
        <MerchantForm onSubmit={handleCreateMerchant} />
      </Dialog>

      {selectedMerchant && (
        <Dialog
          isOpen={showKYCModal}
          onClose={() => {
            setShowKYCModal(false);
            setSelectedMerchant(null);
          }}
          title="KYC Verification"
        >
          <KYCVerification
            merchant={selectedMerchant}
            onVerify={(status, remarks) => handleKYCVerification(selectedMerchant.id, status, remarks)}
          />
        </Dialog>
      )}

      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}