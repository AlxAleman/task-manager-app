// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar traducciones
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('taskflow-language') || 'es', // idioma por defecto
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // react ya se encarga del escape
    },
    
    // Configuración para desarrollo
    debug: false,
    
    // Configuración de detección
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;