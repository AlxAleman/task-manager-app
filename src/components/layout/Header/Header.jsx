// src/components/layout/Header/Header.jsx
import React from 'react';
import { Search, Bell, Settings, Moon, Sun, Globe } from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import { useTheme, useTasks, useI18n } from '@/hooks'; // Cambiado useLanguage por useI18n

const Header = () => {
    const { isDark, toggleTheme } = useTheme();
    const { state, setSearch } = useTasks();
    const { language, toggleLanguage, t } = useI18n(); // Ahora usamos useI18n

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
            <div className="flex items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="flex items-center gap-4 flex-1 max-w-md">
                    <Input
                        icon={Search}
                        placeholder={t('searchPlaceholder')}
                        value={state.searchQuery}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600"
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    {/* Language Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                        className="relative group"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="ml-1 text-xs font-medium uppercase">
                            {language}
                        </span>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                        </div>
                    </Button>

                    {/* Notifications */}
                    <div className="relative">
                        <Button variant="ghost" size="sm" className="relative">
                            <Bell className="w-4 h-4" />
                            <Badge
                                variant="danger"
                                size="sm"
                                className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs animate-pulse"
                            >
                                3
                            </Badge>
                        </Button>
                    </div>

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        title={isDark ? t('switchToLight') || 'Switch to light mode' : t('switchToDark') || 'Switch to dark mode'}
                        className="relative group"
                    >
                        <div className="relative w-4 h-4">
                            <Sun className={`w-4 h-4 absolute transition-all duration-300 ${isDark ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                            <Moon className={`w-4 h-4 absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            {isDark ? t('lightMode') : t('darkMode')}
                        </div>
                    </Button>

                    {/* Settings */}
                    <Button variant="ghost" size="sm" title={t('settings')} className="hidden sm:flex">
                        <Settings className="w-4 h-4" />
                    </Button>

                    {/* User Profile */}
                    <div className="ml-3 flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {t('userPro')}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {t('userEmail')}
                            </p>

                        </div>

                        <button className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            <span className="text-white text-sm font-medium">UP</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;