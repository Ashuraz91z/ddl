'use client';

import { useState } from 'react';
import { BellIcon } from '@heroicons/react/outline';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-64 right-0 bg-white dark:bg-gray-900 shadow-md z-40">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Tableau de Bord
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-md"
        >
          <nav className="flex flex-col space-y-2 p-4">
            <a
              href="#"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Profil
            </a>
            <a
              href="#"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Messages
            </a>
            <a
              href="#"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Paramètres
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
