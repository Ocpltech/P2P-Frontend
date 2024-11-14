import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Building2, 
  Users, 
  Settings, 
  Smartphone,
  IndianRupee,
  ArrowDownUp,
  Link,
  RefreshCw,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  userType: 'admin' | 'merchant';
}

export function Sidebar({ userType }: SidebarProps) {
  const adminNavigation = [
    { name: 'Dashboard', icon: Home, path: '/admin' },
    { name: 'Merchants', icon: Users, path: '/admin/merchants' },
    { name: 'Transactions', icon: CreditCard, path: '/admin/transactions' },
    { name: 'Bank Accounts', icon: Building2, path: '/admin/bank-accounts' },
    { name: 'Commissions', icon: IndianRupee, path: '/admin/commissions' },
    { name: 'Payment Routing', icon: ArrowDownUp, path: '/admin/routing' },
    { name: 'SMS Integration', icon: Smartphone, path: '/admin/sms' },
    { name: 'Settlements', icon: RefreshCw, path: '/admin/settlements' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' }
  ];

  const merchantNavigation = [
    { name: 'Dashboard', icon: Home, path: '/merchant' },
    { name: 'Transactions', icon: CreditCard, path: '/merchant/transactions' },
    { name: 'Payment Links', icon: Link, path: '/merchant/payment-links' },
    { name: 'Bank Accounts', icon: Building2, path: '/merchant/bank-accounts' },
    { name: 'Refunds', icon: RefreshCw, path: '/merchant/refunds' },
    { name: 'Disputes', icon: AlertTriangle, path: '/merchant/disputes' },
    { name: 'Settings', icon: Settings, path: '/merchant/settings' }
  ];

  const navigation = userType === 'admin' ? adminNavigation : merchantNavigation;

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 flex flex-col divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto" aria-label="Sidebar">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md
                    ${isActive
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-4 flex-shrink-0 h-6 w-6
                      group-hover:text-gray-500 dark:group-hover:text-gray-300
                    `}
                  />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}