// app/settings/page.js
'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    setDarkModeEnabled(theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newEnabled = !darkModeEnabled;
    setDarkModeEnabled(newEnabled);
    setTheme(newEnabled ? 'dark' : 'light');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-lg">Mode Sombre</span>
          <Switch
            checked={darkModeEnabled}
            onChange={toggleTheme}
            className={`${
              darkModeEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span
              className={`${
                darkModeEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg">Notifications</span>
          <Switch
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`${
              notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span
              className={`${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        <div>
          <label className="block text-lg mb-2">Langue de l'application</label>
          <select className="w-full border border-gray-300 p-2 rounded-md">
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
        </div>

        <button
          type="button"
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  );
}
