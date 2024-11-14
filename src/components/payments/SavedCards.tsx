import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

interface SavedCard {
  id: string;
  last4: string;
  expiryDate: string;
  cardType: 'visa' | 'mastercard' | 'rupay';
  isDefault?: boolean;
}

interface SavedCardsProps {
  cards: SavedCard[];
  onSelectCard: (cardId: string) => void;
  onAddNewCard: () => void;
}

export function SavedCards({ cards, onSelectCard, onAddNewCard }: SavedCardsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
        Saved Cards
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onSelectCard(card.id)}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  •••• {card.last4}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Expires {card.expiryDate}
                </p>
              </div>
            </div>
            {card.isDefault && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                Default
              </span>
            )}
          </button>
        ))}

        <button
          onClick={onAddNewCard}
          className="flex items-center justify-center p-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Add New Card
          </span>
        </button>
      </div>
    </div>
  );
}