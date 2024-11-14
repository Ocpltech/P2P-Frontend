import React from 'react';
import { BulkUpload } from '../dashboard/BulkUpload';
import { DataExport } from '../dashboard/DataExport';

interface BulkOperationsProps {
  type: 'transactions' | 'merchants' | 'bank-accounts';
}

export function BulkOperations({ type }: BulkOperationsProps) {
  const handleUpload = (file: File) => {
    // In a real app, this would handle the file upload
    console.log(`Uploading ${type}:`, file);
  };

  const handleExport = (format: 'csv' | 'excel', dateRange: { start: string; end: string }) => {
    // In a real app, this would trigger an API call
    console.log(`Exporting ${type}:`, { format, dateRange });
  };

  return (
    <div className="flex space-x-4">
      <BulkUpload onUpload={handleUpload} type={type} />
      <DataExport onExport={handleExport} />
    </div>
  );
}