// TaskViewContext.js
"use client"
import { createContext, useContext, useState } from 'react'

const TaskViewContext = createContext()

export function TaskViewProvider({ children }) {
  const [activeView, setActiveView] = useState('list') // مقدار اولیه دلخواهت

  return (
    <TaskViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </TaskViewContext.Provider>
  )
}

// هوک سفارشی (برای راحتی استفاده)
export const useTaskView = () => useContext(TaskViewContext)
