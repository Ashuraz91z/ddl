// components/Footer.jsx
'use client';

import { useTheme } from 'next-themes';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Dadalu</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Innovons ensemble pour éclairer nos villes :)
            </p>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/route-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Planificateur d'Itinéraire
                </a>
              </li>
              <li>
                <a href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Paramètres
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8"></div>
Y        <div className="mt-4 flex flex-col md:flex-row md:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Dadalu.
          </p>
        </div>
      </div>
    </footer>
  );
}
