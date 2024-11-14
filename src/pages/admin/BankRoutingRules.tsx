import React, { useState } from 'react';
import { Plus, ArrowDownUp, AlertTriangle } from 'lucide-react';
import { Dialog } from '../../components/ui/Dialog';
import { Toast } from '../../components/notifications/Toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PaymentMethod } from '../../types/payment';

interface RoutingRule {
  id: string;
  name: string;
  conditions: {
    amount: { min: number; max: number };
    methods: PaymentMethod[];
    merchantCategories?: string[];
  };
  bankAccounts: string[];
  priority: number;
  isActive: boolean;
}

export function BankRoutingRules() {
  const [rules, setRules] = useState<RoutingRule[]>([]);
  const [showAddRule, setShowAddRule] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [editingRule, setEditingRule] = useState<RoutingRule | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(rules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update priorities
    const updatedItems = items.map((item, index) => ({
      ...item,
      priority: index + 1
    }));

    setRules(updatedItems);
    setToastMessage('Rule priorities updated');
    setShowToast(true);
  };

  const handleSubmit = (data: any) => {
    if (editingRule) {
      // Update existing rule
      setRules(rules.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...data, id: rule.id, priority: rule.priority }
          : rule
      ));
      setToastMessage('Rule updated successfully');
    } else {
      // Create new rule
      const newRule: RoutingRule = {
        ...data,
        id: `rule_${Date.now()}`,
        priority: rules.length + 1
      };
      setRules([...rules, newRule]);
      setToastMessage('Rule created successfully');
    }
    setShowAddRule(false);
    setEditingRule(null);
    setShowToast(true);
  };

  const handleEditRule = (rule: RoutingRule) => {
    setEditingRule(rule);
    setShowAddRule(true);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
    setToastMessage('Rule deleted successfully');
    setShowToast(true);
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
    setToastMessage('Rule status updated');
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Routing Rules</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure rules for automatic transaction routing
          </p>
        </div>
        <button
          onClick={() => {
            setEditingRule(null);
            setShowAddRule(true);
          }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Rules</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ArrowDownUp className="w-4 h-4 mr-2" />
              Drag to reorder priority
            </div>
          </div>

          {rules.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No routing rules
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add your first rule to start routing transactions
              </p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="rules">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {rules.map((rule, index) => (
                      <Draggable key={rule.id} draggableId={rule.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    {rule.priority}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {rule.name}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Amount: ₹{rule.conditions.amount.min.toLocaleString()} - 
                                    {rule.conditions.amount.max === Infinity 
                                      ? ' No limit' 
                                      : ` ₹${rule.conditions.amount.max.toLocaleString()}`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={rule.isActive}
                                    onChange={() => handleToggleRule(rule.id)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                                <button
                                  onClick={() => handleEditRule(rule)}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteRule(rule.id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>

      <Dialog
        isOpen={showAddRule}
        onClose={() => {
          setShowAddRule(false);
          setEditingRule(null);
        }}
        title={editingRule ? 'Edit Routing Rule' : 'Add Routing Rule'}
      >
        <RuleForm
          onSubmit={handleSubmit}
          initialData={editingRule}
          onCancel={() => {
            setShowAddRule(false);
            setEditingRule(null);
          }}
        />
      </Dialog>

      {showToast && (
        <Toast
          type="success"
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}