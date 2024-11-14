import React from 'react';
import { Bell, Search, Settings, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Dropdown } from '../ui/Dropdown';
import { Tooltip } from '../ui/Tooltip';

interface TopBarProps {
  userName: string;
}

export function TopBar({ userName }: TopBarProps) {
  const navigate = useNavigate();
  const userType = useAuthStore((state) => state.userType);
  const logout = useAuthStore((state) => state.logout);

  const handleSettingsClick = () => {
    navigate(`/${userType}/settings`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    { label: 'Settings', onClick: handleSettingsClick },
    { label: 'Logout', onClick: handleLogout }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Adyen Payment Solutions</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="max-w-lg w-full lg:max-w-xs mr-4">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search transactions..."
                  type="search"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Tooltip content="Notifications">
                <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
              </Tooltip>
              
              <Tooltip content="Settings">
                <button
                  onClick={handleSettingsClick}
                  className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Open settings</span>
                  <Settings className="h-6 w-6" />
                </button>
              </Tooltip>

              <Dropdown
                trigger={
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {userName}
                  </span>
                }
                items={userMenuItems}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}