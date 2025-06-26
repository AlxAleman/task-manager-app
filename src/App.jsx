// src/App.jsx
import React, { Suspense } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TaskProvider } from '@/contexts/TaskContext';
import { Layout } from '@/components/layout';

// Importar i18n
import '@/i18n';

// Componente de carga
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ThemeProvider>
        <TaskProvider>
          <div className="fullscreen-layout bg-gray-50 dark:bg-gray-900">
            <Layout />
          </div>
        </TaskProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;