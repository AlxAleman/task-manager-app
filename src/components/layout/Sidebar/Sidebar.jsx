// src/components/layout/Sidebar/Sidebar.jsx
import React from 'react';
import {
    Target,
    BarChart3,
    Circle,
    CheckCircle,
    Calendar,
    AlertCircle,
    TrendingUp,
    PieChart
} from 'lucide-react';
import { Badge } from '@/components/ui';
import { useTasks, useStats, useI18n } from '@/hooks';

const Sidebar = () => {
    const { state, setFilter, setView } = useTasks();
    const stats = useStats();
    const { t } = useI18n();

    const menuItems = [
        {
            id: 'dashboard',
            label: t('dashboard'),
            icon: BarChart3,
            badge: null,
            view: 'dashboard',
            iconColor: '#3b82f6' // blue-500
        },
        {
            id: 'analytics',
            label: t('analytics'),
            icon: PieChart,
            badge: null,
            view: 'analytics',
            iconColor: '#8b5cf6' // violet-500
        },
        {
            id: 'all',
            label: t('allTasks'),
            icon: Target,
            badge: stats.total,
            view: 'tasks',
            iconColor: '#1d4ed8' // blue-700
        },
        {
            id: 'pending',
            label: t('pending'),
            icon: Circle,
            badge: stats.pending,
            view: 'tasks',
            iconColor: '#ea580c' // orange-600
        },
        {
            id: 'completed',
            label: t('completed'),
            icon: CheckCircle,
            badge: stats.completed,
            view: 'tasks',
            iconColor: '#16a34a' // green-600
        },
        {
            id: 'today',
            label: t('today'),
            icon: Calendar,
            badge: stats.today,
            view: 'tasks',
            iconColor: '#0891b2' // cyan-600
        },
        {
            id: 'overdue',
            label: t('overdue'),
            icon: AlertCircle,
            badge: stats.overdue,
            view: 'tasks',
            iconColor: '#dc2626' // red-600
        }
    ];

    const handleMenuClick = (item) => {
        setView(item.view);
        if (item.view === 'tasks') {
            setFilter(item.id);
        }
    };

    const isActive = (item) => {
        return (state.currentView === 'dashboard' && item.id === 'dashboard') ||
            (state.currentView === 'analytics' && item.id === 'analytics') ||
            (state.currentView === 'tasks' && state.currentFilter === item.id);
    };

    return (
        <aside className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-gray-300 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-3">
                    {/* Logo personalizado con círculo completamente blanco */}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <img 
                            src="/alex-logo.png" 
                            alt="Alex Logo" 
                            className="w-7 h-7 object-contain"
                        />
                    </div>
                    <div className="min-w-0">
                        <h1 className="font-bold text-xl text-gray-900 dark:text-white truncate">
                            {t('appName')}
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {t('appSubtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 lg:p-6 overflow-y-auto">
                <div className="space-y-2">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const active = isActive(item);

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item)}
                                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left 
                  transition-all duration-200 group focus-ring font-medium
                  ${active
                                        ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 hover:shadow-sm'
                                    }
                `}
                            >
                                <Icon 
                                    className="w-5 h-5 flex-shrink-0" 
                                    style={{
                                        color: active ? '#ffffff' : item.iconColor
                                    }}
                                />

                                <span className="flex-1 truncate">
                                    {item.label}
                                </span>

                                {item.badge !== null && (
                                    <Badge 
                                        variant={active ? 'default' : 'secondary'} 
                                        className={`flex-shrink-0 ${
                                            active 
                                                ? 'bg-white/20 text-white border-white/30' 
                                                : 'bg-gray-600 text-white dark:bg-gray-600 dark:text-gray-200'
                                        }`}
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Productivity Widget */}
            <div className="p-4 lg:p-6 border-t border-gray-300 dark:border-gray-700 flex-shrink-0">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {t('productivity')}
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('completed')}
                                </span>
                                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                    {stats.completionRate}%
                                </span>
                            </div>

                            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                                    style={{ width: `${stats.completionRate}%` }}
                                />
                            </div>
                        </div>

                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {stats.completed} {t('de')} {stats.total} {t('completedTasks')}
                        </div>

                        {stats.weeklyTasks > 0 && (
                            <div className="text-xs text-blue-700 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                                +{stats.weeklyTasks} {t('thisWeek')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;