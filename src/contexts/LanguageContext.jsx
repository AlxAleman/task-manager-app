// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

// Traducciones
const translations = {
  es: {
    // Header
    searchPlaceholder: "Buscar tareas, proyectos...",

    // Sidebar
    dashboard: "Dashboard",
    analytics: "Analytics",
    allTasks: "Todas las tareas",
    pending: "Pendientes",
    completed: "Completadas",
    // today: "Hoy",
    overdue: "Vencidas",
    productivity: "Productividad",
    completedTasks: "tareas completadas",
    thisWeek: "esta semana",

    // Dashboard
    welcomeBack: "¡Bienvenido de vuelta!",
    welcomeSubtitle: "Aquí tienes un resumen de tu productividad y tareas pendientes.",
    viewAnalytics: "Ver Analytics",
    productivitySummary: "Resumen de Productividad",
    viewComplete: "Ver completo",
    recentTasks: "Tareas Recientes",

    // Stats Cards
    totalTasks: "Total de Tareas",
    completedStats: "Completadas",
    pendingStats: "Pendientes",
    overdueStats: "Vencidas",
    successRate: "tasa de éxito",
    forToday: "para hoy",
    requiresAttention: "Requiere atención",
    allUpToDate: "Todo al día",
    totalTasksWeekly: "esta semana",

    // Quick Actions
    quickActions: "Acciones Rápidas",
    newTask: "Nueva Tarea",
    createNewTask: "Crear una nueva tarea",
    viewCalendar: "Ver Calendario",
    reviewImportantDates: "Revisar fechas importantes",
    manageTeam: "Gestionar Equipo",
    adminCollaborators: "Administrar colaboradores",
    viewReports: "Ver Reportes",
    analyzeProductivity: "Analizar productividad",
    activeProjects: "Proyectos activos",
    efficiency: "Eficiencia",
    avgTime: "Tiempo promedio",

    // Tasks
    allTasksTitle: "📋 Todas las tareas",
    pendingTasksTitle: "⏳ Tareas pendientes",
    completedTasksTitle: "✅ Tareas completadas",
    todayTasksTitle: "📅 Tareas de hoy",
    overdueTasksTitle: "🚨 Tareas vencidas",
    totalTasksDesc: "tareas en total",
    pendingTasksDesc: "tareas esperando ser completadas",
    completedTasksDesc: "tareas completadas exitosamente",
    todayTasksDesc: "tareas programadas para hoy",
    overdueTasksDesc: "tareas que requieren atención urgente",
    noOverdueDesc: "¡Excelente! No tienes tareas vencidas",
    advancedFilters: "Filtros Avanzados",

    // Task List
    noTasksTitle: "No hay tareas que mostrar",
    noTasksDesc: "Crea tu primera tarea para comenzar a ser más productivo",
    createFirstTask: "Crear Primera Tarea",
    tasks: "Tareas",
    filter: "Filtrar",
    edit: "Editar",
    delete: "Eliminar",

    // Add Task Modal
    newTaskTitle: "Nueva Tarea",
    title: "Título",
    titlePlaceholder: "¿Qué necesitas hacer?",
    description: "Descripción",
    descriptionPlaceholder: "Descripción opcional de la tarea...",
    priority: "Prioridad",
    project: "Proyecto",
    dueDate: "Fecha límite",
    dueDateHelper: "Opcional: elige una fecha límite para esta tarea",
    preview: "Vista previa:",
    createTask: "Crear Tarea",
    creatingTask: "Creando tarea...",
    cancel: "Cancelar",

    // Priority levels
    low: "Baja",
    medium: "Media",
    high: "Alta",
    urgent: "Urgente",

    // Projects
    personal: "Personal",
    work: "Trabajo",
    studies: "Estudios",
    fitness: "Fitness",

    // Analytics
    analyticsTitle: "📊 Analytics & Reportes",
    analyticsSubtitle: "Analiza tu productividad y rendimiento con métricas detalladas.",
    thisWeekTrend: "esta semana",
    share: "Compartir",
    export: "Exportar",
    generalProductivity: "Productividad General",
    weeklyTasks: "Tareas Esta Semana",
    dailyAverage: "Promedio Diario",
    weeklyProductivity: "Productividad Semanal",
    weeklyAverage: "Promedio semanal",
    totalTime: "Tiempo total",
    creationVsCompletion: "Creación vs Finalización",
    created: "Creadas",
    productivityTimeline: "Timeline de Productividad",
    events: "eventos",
    tasksCreated: "Tareas creadas",
    sessions: "Sesiones",

    // Timeline
    taskCreated: "Tarea creada:",
    taskCompleted: "Tarea completada:",
    timeElapsed: "Tiempo transcurrido:",
    workSession: "Sesión de trabajo",
    productiveWork: "de trabajo productivo",
    recentActivity: "Actividad Reciente",
    viewAll: "Ver todas",
    noRecentTasks: "No hay tareas recientes",
    recentTasksDesc: "Las tareas que crees aparecerán aquí",

    // Date formats
    // today: "Hoy",
    tomorrow: "Mañana",
    yesterday: "Ayer",
    daysAgo: "Hace {days} días",
    inDays: "En {days} días",
    hoursAgo: "Hace {hours}h",
    minutesAgo: "Hace {minutes}m",

    // Days of week
    monday: "Lun",
    tuesday: "Mar",
    wednesday: "Mié",
    thursday: "Jue",
    friday: "Vie",
    saturday: "Sáb",
    sunday: "Dom"
  },

  en: {
    // Header
    searchPlaceholder: "Search tasks, projects...",

    // Sidebar
    dashboard: "Dashboard",
    analytics: "Analytics",
    allTasks: "All tasks",
    pending: "Pending",
    completed: "Completed",
    today: "Today",
    overdue: "Overdue",
    productivity: "Productivity",
    completedTasks: "completed tasks",
    thisWeek: "this week",

    // Dashboard
    welcomeBack: "Welcome back!",
    welcomeSubtitle: "Here's a summary of your productivity and pending tasks.",
    viewAnalytics: "View Analytics",
    productivitySummary: "Productivity Summary",
    viewComplete: "View complete",
    recentTasks: "Recent Tasks",

    // Stats Cards
    totalTasks: "Total Tasks",
    completedStats: "Completed",
    pendingStats: "Pending",
    overdueStats: "Overdue",
    successRate: "success rate",
    forToday: "for today",
    requiresAttention: "Requires attention",
    allUpToDate: "All up to date",
    totalTasksWeekly: "this week",

    // Quick Actions
    quickActions: "Quick Actions",
    newTask: "New Task",
    createNewTask: "Create a new task",
    viewCalendar: "View Calendar",
    reviewImportantDates: "Review important dates",
    manageTeam: "Manage Team",
    adminCollaborators: "Administer collaborators",
    viewReports: "View Reports",
    analyzeProductivity: "Analyze productivity",
    activeProjects: "Active projects",
    efficiency: "Efficiency",
    avgTime: "Avg time",

    // Tasks
    allTasksTitle: "📋 All tasks",
    pendingTasksTitle: "⏳ Pending tasks",
    completedTasksTitle: "✅ Completed tasks",
    todayTasksTitle: "📅 Today's tasks",
    overdueTasksTitle: "🚨 Overdue tasks",
    totalTasksDesc: "total tasks",
    pendingTasksDesc: "tasks waiting to be completed",
    completedTasksDesc: "tasks completed successfully",
    todayTasksDesc: "tasks scheduled for today",
    overdueTasksDesc: "tasks requiring urgent attention",
    noOverdueDesc: "Excellent! You have no overdue tasks",
    advancedFilters: "Advanced Filters",

    // Task List
    noTasksTitle: "No tasks to show",
    noTasksDesc: "Create your first task to start being more productive",
    createFirstTask: "Create First Task",
    tasks: "Tasks",
    filter: "Filter",
    edit: "Edit",
    delete: "Delete",

    // Add Task Modal
    newTaskTitle: "New Task",
    title: "Title",
    titlePlaceholder: "What do you need to do?",
    description: "Description",
    descriptionPlaceholder: "Optional task description...",
    priority: "Priority",
    project: "Project",
    dueDate: "Due Date",
    dueDateHelper: "Optional: choose a due date for this task",
    preview: "Preview:",
    createTask: "Create Task",
    creatingTask: "Creating task...",
    cancel: "Cancel",

    // Priority levels
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",

    // Projects
    personal: "Personal",
    work: "Work",
    studies: "Studies",
    fitness: "Fitness",

    // Analytics
    analyticsTitle: "📊 Analytics & Reports",
    analyticsSubtitle: "Analyze your productivity and performance with detailed metrics.",
    thisWeekTrend: "this week",
    share: "Share",
    export: "Export",
    generalProductivity: "General Productivity",
    weeklyTasks: "Weekly Tasks",
    dailyAverage: "Daily Average",
    weeklyProductivity: "Weekly Productivity",
    weeklyAverage: "Weekly average",
    totalTime: "Total time",
    creationVsCompletion: "Creation vs Completion",
    created: "Created",
    productivityTimeline: "Productivity Timeline",
    events: "events",
    tasksCreated: "Tasks created",
    sessions: "Sessions",

    // Timeline
    taskCreated: "Task created:",
    taskCompleted: "Task completed:",
    timeElapsed: "Time elapsed:",
    workSession: "Work session",
    productiveWork: "of productive work",
    recentActivity: "Recent Activity",
    viewAll: "View all",
    noRecentTasks: "No recent tasks",
    recentTasksDesc: "Tasks you create will appear here",

    // Date formats
    // today: "Today",
    tomorrow: "Tomorrow",
    yesterday: "Yesterday",
    daysAgo: "{days} days ago",
    inDays: "In {days} days",
    hoursAgo: "{hours}h ago",
    minutesAgo: "{minutes}m ago",

    // Days of week
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('taskflow-language');
    return saved || 'es'; // Default español
  });

  useEffect(() => {
    localStorage.setItem('taskflow-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isSpanish: language === 'es',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
