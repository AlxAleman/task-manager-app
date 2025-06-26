// src/hooks/index.jsx
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';
import { TaskContext } from '../contexts/TaskContext.jsx';

// Exportar useI18n desde el archivo correspondiente
export { useI18n } from './useI18n.js';

// Hook para el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Hook para las tareas
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

// Hook para tareas filtradas
export const useFilteredTasks = () => {
  const { state } = useTasks();
  const { tasks, currentFilter, searchQuery } = state;

  return tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (currentFilter) {
      case 'pending': 
        return !task.completed && matchesSearch;
      case 'completed': 
        return task.completed && matchesSearch;
      case 'today': {
        const today = new Date().toDateString();
        const taskDate = task.dueDate ? new Date(task.dueDate).toDateString() : null;
        return taskDate === today && matchesSearch;
      }
      case 'overdue': {
        const now = new Date();
        const taskDate = task.dueDate ? new Date(task.dueDate) : null;
        return taskDate && taskDate < now && !task.completed && matchesSearch;
      }
      default: 
        return matchesSearch;
    }
  });
};

// Hook para estadísticas
export const useStats = () => {
  const { state } = useTasks();
  const { tasks } = state;

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  
  const today = new Date().toDateString();
  const todayTasks = tasks.filter(t => 
    t.dueDate && new Date(t.dueDate).toDateString() === today
  ).length;
  
  const overdue = tasks.filter(t => 
    t.dueDate && 
    new Date(t.dueDate) < new Date() && 
    !t.completed
  ).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Productividad semanal
  const weeklyStats = tasks.filter(t => {
    const taskDate = new Date(t.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return taskDate >= weekAgo;
  }).length;

  return { 
    total, 
    completed, 
    pending, 
    today: todayTasks, 
    overdue, 
    completionRate,
    weeklyTasks: weeklyStats
  };  
};