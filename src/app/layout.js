// app/layout.js
'use client';

import './globals.css';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex">
        <ThemeProvider attribute="class">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto mt-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
