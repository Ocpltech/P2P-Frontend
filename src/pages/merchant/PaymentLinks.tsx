import React, { useState } from 'react';
import { Plus, Link, Copy, QrCode, MoreVertical, Search, Filter } from 'lucide-react';
import { CreatePaymentLinkModal } from '../../components/modals/CreatePaymentLinkModal';
import { Toast } from '../../components/notifications/Toast';
import { formatINR } from '../../lib/utils';

const mockPaymentLinks = [
  {
    id: 'link_1',
    name: 'Product Purchase',
    amount: 25000,
    currency: 'INR',
    status: 'active',
    createdAt: '2024-03-15T10:30:00Z',
    expiresAt: '2024-04-15T10:30:00Z',
    url: 'https://pay.example.com/link/abc123',
    description: 'Payment for premium product',
    totalPayments: 12,
    successfulPayments: 10
  },
  {
    id: 'link_2',
    name: 'Service Subscription',
    amount: 15000,
    currency: 'INR',
    status: 'expired',
    createdAt: '2024-03-10T10:30:00Z',
    expiresAt: '2024-03-15T10:30:00Z',
    url: 'https://pay.example.com/link/def456',
    description: 'Monthly service subscription',
    totalPayments: 5,
    successfulPayments: 5
  }
];

export function PaymentLinks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  const handleCreateLink = (data: any) => {
    console.log('Creating payment link:', data);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Links</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create and manage payment links for your customers
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Payment Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Links</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {mockPaymentLinks.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Links</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {mockPaymentLinks.filter(link => link.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Collections</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {formatINR(mockPaymentLinks.reduce((acc, link) => acc + (link.amount * link.successfulPayments), 0))}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search payment links..."
                className="input-primary pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <select className="input-primary min-w-[150px]">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
              <button className="btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Link Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payments
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockPaymentLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Link className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {link.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {link.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatINR(link.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${link.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                        {link.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(link.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(link.expiresAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {link.successfulPayments}/{link.totalPayments}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => copyToClipboard(link.url)}
                          className="text-gray-400 hover:text-gray-500"
                          title="Copy link"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-500"
                          title="Show QR code"
                        >
                          <QrCode className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-500"
                          title="More options"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreatePaymentLinkModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateLink}
      />

      {showToast && (
        <div className="fixed bottom-4 right-4">
          <Toast
            type="success"
            message="Payment link copied to clipboard"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}