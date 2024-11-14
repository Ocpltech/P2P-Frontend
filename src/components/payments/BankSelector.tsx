import React, { useState } from 'react';
import { Building2, Search } from 'lucide-react';

interface Bank {
  id: string;
  name: string;
  ifscPrefix: string;
}

interface BankSelectorProps {
  onSelect: (bankId: string) => void;
}

export function BankSelector({ onSelect }: BankSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const popularBanks: Bank[] = [
    { id: 'hdfc', name: 'HDFC Bank', ifscPrefix: 'HDFC' },
    { id: 'sbi', name: 'State Bank of India', ifscPrefix: 'SBIN' },
    { id: 'icici', name: 'ICICI Bank', ifscPrefix: 'ICIC' },
    { id: 'axis', name: 'Axis Bank', ifscPrefix: 'UTIB' },
    { id: 'kotak', name: 'Kotak Mahindra Bank', ifscPrefix: 'KKBK' },
    { id: 'pnb', name: 'Punjab National Bank', ifscPrefix: 'PUNB' },
    { id: 'bob', name: 'Bank of Baroda', ifscPrefix: 'BARB' },
    { id: 'iob', name: 'Indian Overseas Bank', ifscPrefix: 'IOBA' },
    { id: 'union', name: 'Union Bank of India', ifscPrefix: 'UBIN' },
    { id: 'canara', name: 'Canara Bank', ifscPrefix: 'CNRB' },
    { id: 'yes', name: 'Yes Bank', ifscPrefix: 'YESB' },
    { id: 'idbi', name: 'IDBI Bank', ifscPrefix: 'IBKL' }
  ];

  const filteredBanks = popularBanks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search bank name..."
          className="input-primary pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
        {filteredBanks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => onSelect(bank.id)}
            className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3 text-left">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {bank.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                IFSC: {bank.ifscPrefix}
              </span>
            </div>
          </button>
        ))}
      </div>

      {filteredBanks.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No banks found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}