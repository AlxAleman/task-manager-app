// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Prioridad: localStorage > preferencia del sistema
    const saved = localStorage.getItem('taskflow-theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Aplicar tema inmediatamente al montar
  useEffect(() => {
    applyTheme(isDark);
  }, []);

  // Función para aplicar el tema
  const applyTheme = (darkMode) => {
    const root = document.documentElement;
    const body = document.body;
    
    // Aplicar/remover clase dark
    if (darkMode) {
      root.classList.add('dark');
      body.style.backgroundColor = '#111827'; // gray-900
      body.style.color = '#f9fafb'; // gray-50
    } else {
      root.classList.remove('dark');
      body.style.backgroundColor = '#f9fafb'; // gray-50
      body.style.color = '#111827'; // gray-900
    }

    // Mantener estilos de layout
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.inset = '0';
    body.style.margin = '0';
    body.style.padding = '0';
  };

  useEffect(() => {
    // Guardar preferencia
    localStorage.setItem('taskflow-theme', isDark ? 'dark' : 'light');
    
    // Aplicar tema
    applyTheme(isDark);

    // Forzar re-render de componentes que dependen del tema
    window.dispatchEvent(new Event('storage'));
  }, [isDark]);

  // Escuchar cambios en preferencias del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Solo cambiar si no hay preferencia guardada
      const saved = localStorage.getItem('taskflow-theme');
      if (!saved) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Aplicar inmediatamente
    setTimeout(() => {
      applyTheme(newTheme);
    }, 0);
  };

  const value = {
    isDark,
    setIsDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};