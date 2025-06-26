// Archivos corregidos uno por uno para traducción con t('clave') y useI18n

// ---------- ProductivityChart.jsx ----------
import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from '@/components/ui';
import { TrendingUp, Calendar } from 'lucide-react';
import { useTasks } from '@/hooks';
import { useI18n } from '@/hooks/useI18n';

const ProductivityChart = () => {
  const { state } = useTasks();
  const { t } = useI18n();

  const generateProductivityData = () => {
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
      const dateStr = date.toISOString().split('T')[0];

      const tasksForDay = state.tasks.filter(task => {
        const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
        return taskDate === dateStr;
      });

      const completedForDay = tasksForDay.filter(task => task.completed).length;
      const totalForDay = tasksForDay.length;
      const productivity = totalForDay > 0 ? Math.round((completedForDay / totalForDay) * 100) : 0;

      const simulatedData = {
        name: dayName,
        date: dateStr,
        completadas: completedForDay + Math.floor(Math.random() * 3),
        creadas: totalForDay + Math.floor(Math.random() * 5),
        productividad: productivity || Math.floor(Math.random() * 40) + 60,
        tiempo: Math.floor(Math.random() * 4) + 2
      };

      data.push(simulatedData);
    }

    return data;
  };

  const productivityData = generateProductivityData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'productividad' ? '%' : ''}
              {entry.dataKey === 'tiempo' ? 'h' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('weeklyProductivity')}
          </h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={productivityData}>
              <defs>
                <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-xs text-gray-500" axisLine={false} tickLine={false} />
              <YAxis className="text-xs text-gray-500" axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="productividad" stroke="#3B82F6" strokeWidth={2} fill="url(#productivityGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(productivityData.reduce((acc, day) => acc + day.productividad, 0) / 7)}%
            </p>
            <p className="text-xs text-gray-500">{t('weeklyAverage')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {productivityData.reduce((acc, day) => acc + day.completadas, 0)}
            </p>
            <p className="text-xs text-gray-500">{t('tasksCompleted')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(productivityData.reduce((acc, day) => acc + day.tiempo, 0) * 10) / 10}h
            </p>
            <p className="text-xs text-gray-500">{t('totalTime')}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('creationVsCompletion')}
          </h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-xs text-gray-500" axisLine={false} tickLine={false} />
              <YAxis className="text-xs text-gray-500" axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="creadas" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} name={t('tasksCreated')} />
              <Line type="monotone" dataKey="completadas" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} name={t('tasksCompleted')} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('created')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('completed')}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductivityChart;

