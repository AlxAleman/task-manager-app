// src/hooks/useI18n.js
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('taskflow-language', lng);
  }, [i18n]);

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  }, [i18n.language, changeLanguage]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language || 'es';
  }, [i18n.language]);

  // Función helper para traducir con fallback
  const translate = useCallback((key, options = {}) => {
    return t(key, options);
  }, [t]);

  // Función para formatear fechas según el idioma
  const formatDate = useCallback((date, options = {}) => {
    const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  }, [i18n.language]);

  // Función para obtener el nombre del día de la semana
  const getDayName = useCallback((dayKey, short = false) => {
    if (short) {
      return t(`days.${dayKey.toLowerCase().slice(0, 3)}`);
    }
    return t(`days.${dayKey.toLowerCase()}`);
  }, [t]);

  // Función para obtener el nombre del mes
  const getMonthName = useCallback((monthKey) => {
    return t(`months.${monthKey.toLowerCase()}`);
  }, [t]);

  // Función para traducir prioridades
  const translatePriority = useCallback((priority) => {
    return t(`priority.${priority.toLowerCase()}`);
  }, [t]);

  // Función para traducir categorías
  const translateCategory = useCallback((category) => {
    return t(`categories.${category.toLowerCase()}`);
  }, [t]);

  return {
    t: translate,
    i18n,
    language: getCurrentLanguage(),
    changeLanguage,
    toggleLanguage,
    formatDate,
    getDayName,
    getMonthName,
    translatePriority,
    translateCategory
  };
};