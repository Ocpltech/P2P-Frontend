import React, { useState } from 'react';
import { Upload, AlertTriangle } from 'lucide-react';
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
    onUpload(file);
    setShowDialog(false);
    setFile(null);
  };

  const getTemplateLink = () => {
    switch (type) {
      case 'transactions':
        return '/templates/transactions-template.csv';
      case 'merchants':
        return '/templates/merchants-template.csv';
      case 'bank-accounts':
        return '/templates/bank-accounts-template.csv';
      default:
        return '';
    }
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
        }}
        title="Bulk Upload"
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

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Please ensure your CSV file follows the required format.</p>
            <a
              href={getTemplateLink()}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Download template
            </a>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDialog(false);
                setFile(null);
                setError('');
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="btn-primary"
              disabled={!file || !!error}
            >
              Upload
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}