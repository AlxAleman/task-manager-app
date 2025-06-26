// src/contexts/TaskContext.js
import React, { createContext, useReducer, useEffect } from 'react';

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask = { 
        ...action.payload, 
        id: Date.now(),
        createdAt: new Date().toISOString(),
        completed: false
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask]
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id 
            ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : task
        )
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload 
            ? { 
                ...task, 
                completed: !task.completed, 
                completedAt: !task.completed ? new Date().toISOString() : null 
              }
            : task
        )
      };
    
    case 'SET_FILTER':
      return { ...state, currentFilter: action.payload };
    
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        title: "Diseñar wireframes del dashboard",
        description: "Crear los wireframes principales para la nueva versión del dashboard",
        priority: "high",
        project: "Trabajo",
        dueDate: "2025-06-27",
        completed: false,
        createdAt: "2025-06-26T10:00:00Z"
      },
      {
        id: 2,
        title: "Revisar documentación de React",
        description: "Estudiar las nuevas características de React 18",
        priority: "medium",
        project: "Estudios",
        dueDate: "2025-06-26",
        completed: true,
        createdAt: "2025-06-25T14:30:00Z",
        completedAt: "2025-06-26T09:15:00Z"
      },
      {
        id: 3,
        title: "Entrenar 45 minutos",
        description: "Rutina de cardio y fuerza",
        priority: "medium",
        project: "Fitness",
        dueDate: "2025-06-26",
        completed: false,
        createdAt: "2025-06-26T06:00:00Z"
      }
    ],
    projects: ['Personal', 'Trabajo', 'Estudios', 'Fitness'],
    currentFilter: 'all',
    searchQuery: '',
    currentView: 'dashboard'
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-data', JSON.stringify(state));
  }, [state]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('taskflow-data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.tasks && Array.isArray(data.tasks)) {
          dispatch({ type: 'LOAD_DATA', payload: data });
        }
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  const value = {
    state,
    dispatch,
    // Action creators
    addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    updateTask: (id, updates) => dispatch({ type: 'UPDATE_TASK', payload: { id, updates } }),
    deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    toggleTask: (id) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: filter }),
    setSearch: (query) => dispatch({ type: 'SET_SEARCH', payload: query }),
    setView: (view) => dispatch({ type: 'SET_VIEW', payload: view })
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};