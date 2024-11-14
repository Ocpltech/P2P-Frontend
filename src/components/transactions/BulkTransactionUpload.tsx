import React, { useState } from 'react';
import { Upload, AlertTriangle, Download } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Toast } from '../notifications/Toast';

interface BulkTransactionUploadProps {
  onUpload: (file: File) => void;
}

export function BulkTransactionUpload({ onUpload }: BulkTransactionUploadProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

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
    setShowToast(true);
  };

  const downloadTemplate = () => {
    // In a real app, this would be a proper template file
    const template = 'Transaction ID,Amount,Description,Date\n,1000,Sample Transaction,2024-03-15';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-template.csv';
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
        }}
        title="Bulk Transaction Upload"
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