import React, { useState } from 'react';
import { Search, Filter, MessageSquare, AlertTriangle, Upload } from 'lucide-react';
import { formatINR } from '../../lib/utils';
import { motion } from 'framer-motion';
import { Dialog } from '../../components/ui/Dialog';
import { Toast } from '../../components/notifications/Toast';

const mockDisputes = [
  {
    id: 'dsp_1',
    transactionId: 'tx_1',
    amount: 35000.00,
    status: 'open',
    reason: 'Product not received',
    category: 'delivery',
    customerName: 'Jane Smith',
    openedAt: '2024-03-15T10:30:00Z',
    dueBy: '2024-03-22T10:30:00Z',
    evidence: {
      submitted: true,
      dueBy: '2024-03-20T10:30:00Z'
    }
  },
  {
    id: 'dsp_2',
    transactionId: 'tx_2',
    amount: 15000.00,
    status: 'pending_response',
    reason: 'Item damaged',
    category: 'product_quality',
    customerName: 'John Doe',
    openedAt: '2024-03-14T15:45:00Z',
    dueBy: '2024-03-21T15:45:00Z',
    evidence: {
      submitted: false,
      dueBy: '2024-03-19T15:45:00Z'
    }
  }
];

export function DisputeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEvidenceDialog, setShowEvidenceDialog] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  const handleEvidenceSubmit = (data: any) => {
    console.log('Submitting evidence:', data);
    setShowToast(true);
    setShowEvidenceDialog(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispute Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Handle and resolve payment disputes
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <h3 className="ml-2 text-lg font-medium text-yellow-900 dark:text-yellow-100">
              Open Disputes
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-yellow-900 dark:text-yellow-100">3</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h3 className="ml-2 text-lg font-medium text-red-900 dark:text-red-100">
              Evidence Required
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-red-900 dark:text-red-100">1</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <div className="flex items-center">
            <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h3 className="ml-2 text-lg font-medium text-green-900 dark:text-green-100">
              Resolved
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-900 dark:text-green-100">12</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm"
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search disputes..."
                className="input-primary pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <select className="input-primary min-w-[150px]">
                <option>All Statuses</option>
                <option>Open</option>
                <option>Under Review</option>
                <option>Resolved</option>
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
                    Dispute ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Evidence
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockDisputes.map((dispute) => (
                  <motion.tr
                    key={dispute.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {dispute.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatINR(dispute.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        {dispute.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {dispute.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {dispute.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(dispute.dueBy).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {dispute.evidence.submitted ? (
                        <span className="text-green-600 dark:text-green-400">Submitted</span>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedDispute(dispute);
                            setShowEvidenceDialog(true);
                          }}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Submit Evidence
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <Dialog
        isOpen={showEvidenceDialog}
        onClose={() => setShowEvidenceDialog(false)}
        title="Submit Dispute Evidence"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleEvidenceSubmit({
            disputeId: selectedDispute?.id,
            evidence: {
              description: e.currentTarget.description.value,
              // Add more fields as needed
            }
          });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Evidence Description
              </label>
              <textarea
                name="description"
                rows={4}
                className="mt-1 input-primary"
                placeholder="Provide details about your evidence..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Documents
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowEvidenceDialog(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Submit Evidence
            </button>
          </div>
        </form>
      </Dialog>

      {showToast && (
        <Toast
          type="success"
          message="Evidence submitted successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}