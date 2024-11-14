import React, { useState } from 'react';
import { Upload, AlertTriangle, Download } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Toast } from '../notifications/Toast';

interface BulkUploadProps {
  onUpload: (file: File) => void;
  type: 'transactions' | 'merchants' | 'bank-accounts';
}

export function BulkUpload({ onUpload, type }: BulkUploadProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onUpload(file);
        setShowDialog(false);
        setFile(null);
        setUploadProgress(0);
        setShowToast(true);
      }
    }, 500);
  };

  const getTemplateFields = () => {
    switch (type) {
      case 'transactions':
        return [
          'Transaction ID',
          'Amount',
          'Currency',
          'Description',
          'Customer Name',
          'Customer Email',
          'Payment Method',
          'Bank Account',
          'Date'
        ];
      case 'merchants':
        return [
          'Merchant ID',
          'Business Name',
          'Contact Name',
          'Email',
          'Phone',
          'Address',
          'Business Type',
          'GST Number',
          'PAN Number'
        ];
      case 'bank-accounts':
        return [
          'Account Number',
          'IFSC Code',
          'Bank Name',
          'Branch Name',
          'Account Type',
          'Account Holder Name',
          'UPI ID',
          'Daily Limit',
          'Transaction Limit'
        ];
      default:
        return [];
    }
  };

  const downloadTemplate = () => {
    const fields = getTemplateFields();
    const template = fields.join(',') + '\n' + fields.map(() => '').join(',');
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="btn-secondary"
      >
        <Upload className="w-4 h-4 mr-2" />
        Bulk Upload
      </button>

      <Dialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setFile(null);
          setError('');
          setUploadProgress(0);
        }}
        title={`Bulk ${type.charAt(0).toUpperCase() + type.slice(1)} Upload`}
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    dark:file:bg-blue-900/20 dark:file:text-blue-400"
                />
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Selected file: {file.name}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Please ensure your CSV file follows the required format.</p>
            <button
              onClick={downloadTemplate}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 flex items-center mt-2"
            >
              <Download className="w-4 h-4 mr-2" />
              Download template
            </button>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDialog(false);
                setFile(null);
                setError('');
                setUploadProgress(0);
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="btn-primary"
              disabled={!file || !!error || uploadProgress > 0}
            >
              Upload
            </button>
          </div>
        </div>
      </Dialog>

      {showToast && (
        <Toast
          type="success"
          message="File uploaded successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}