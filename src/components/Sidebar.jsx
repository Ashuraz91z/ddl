// components/Sidebar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  MapIcon,
  CogIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { FaBell } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { name: 'Accueil', href: '/', icon: HomeIcon },
    { name: 'Planificateur d\'Itinéraire', href: '/route-planner', icon: MapIcon },
    { name: 'Paramètres', href: '/settings', icon: CogIcon },
  ];

  if (!mounted) return null;

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <XIcon className="h-8 w-8 text-gray-800 dark:text-white" />
          ) : (
            <MenuIcon className="h-8 w-8 text-gray-800 dark:text-white" />
          )}
        </button>
      </div>

      {isOpen && (
        <motion.div
          key="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <motion.aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-white z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center space-x-2">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold">Smart Cities</span>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <div
                      className="flex items-center px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
                      onClick={() => isOpen && toggleSidebar()}
                    >
                      <item.icon className="h-6 w-6 mr-3" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaBell className="text-yellow-500" />
                <span>Nouveau message reçu</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span>Mode Sombre</span>
              <Switch
                checked={theme === 'dark'}
                onChange={toggleDarkMode}
                className={`${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <p>&copy; {new Date().getFullYear()} DDL</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
