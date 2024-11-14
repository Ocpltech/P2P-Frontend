import React, { useState } from 'react';
import { Shield, AlertTriangle, Activity, Search, Filter, BarChart3 } from 'lucide-react';
import { formatINR } from '../../lib/utils';
import { motion } from 'framer-motion';
import { Dialog } from '../../components/ui/Dialog';
import { Toast } from '../../components/notifications/Toast';

interface RiskAlert {
  id: string;
  type: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  status: 'open' | 'investigating' | 'resolved';
}

const mockAlerts: RiskAlert[] = [
  {
    id: 'alert_1',
    type: 'high',
    message: 'Unusual transaction pattern detected',
    timestamp: '2024-03-15T10:30:00Z',
    merchantId: 'merch_1',
    merchantName: 'TechCorp India Ltd',
    amount: 250000,
    status: 'open'
  },
  {
    id: 'alert_2',
    type: 'medium',
    message: 'Multiple failed transactions',
    timestamp: '2024-03-15T09:45:00Z',
    merchantId: 'merch_2',
    merchantName: 'Digital Solutions Pvt Ltd',
    amount: 75000,
    status: 'investigating'
  }
];

export function RiskMonitoring() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (alertId: string, newStatus: RiskAlert['status']) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
    setShowToast(true);
  };

  const getStatusColor = (status: RiskAlert['status']) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getRiskColor = (type: RiskAlert['type']) => {
    switch (type) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Monitoring</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor and manage transaction risks
          </p>
        </div>
        <button className="btn-secondary">
          <BarChart3 className="w-4 h-4 mr-2" />
          Risk Analytics
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h3 className="ml-2 text-lg font-medium text-red-900 dark:text-red-100">
              High Risk Alerts
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-red-900 dark:text-red-100">
            {alerts.filter(a => a.type === 'high' && a.status === 'open').length}
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <h3 className="ml-2 text-lg font-medium text-yellow-900 dark:text-yellow-100">
              Under Investigation
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-yellow-900 dark:text-yellow-100">
            {alerts.filter(a => a.status === 'investigating').length}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h3 className="ml-2 text-lg font-medium text-green-900 dark:text-green-100">
              Risk Score
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-900 dark:text-green-100">85/100</p>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                className="input-primary pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <select className="input-primary min-w-[150px]">
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
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
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Alert Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {alerts.map((alert) => (
                  <motion.tr
                    key={alert.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center ${getRiskColor(alert.type)}`}>
                        <AlertTriangle className="w-5 h-5 mr-1.5" />
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{alert.message}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {alert.merchantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatINR(alert.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedAlert(alert);
                          setShowDialog(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Review
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title="Risk Alert Details"
      >
        {selectedAlert && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Risk Level
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedAlert.type.toUpperCase()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  className="mt-1 input-primary"
                  value={selectedAlert.status}
                  onChange={(e) => handleStatusChange(selectedAlert.id, e.target.value as RiskAlert['status'])}
                >
                  <option value="open">Open</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Alert Message
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {selectedAlert.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Merchant Details
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {selectedAlert.merchantName} ({selectedAlert.merchantId})
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Transaction Amount
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatINR(selectedAlert.amount)}
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDialog(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Dialog>

      {showToast && (
        <Toast
          type="success"
          message="Alert status updated successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}