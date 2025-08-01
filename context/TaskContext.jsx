"use client";
import { createContext, useContext, useState } from "react";
import { tasksData as initialTasks, updateTask as updateTaskInFile } from "@/data/tasksData";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([...initialTasks]);
  // update task and update the source file
  const updateTask = (taskId, updates) => {
    setTasks(ts =>
      ts.map((t) => t.id === taskId ? { ...t, ...updates } : t)
    );
    // mock: همزمان دیتا فایل را هم آپدیت کن (برای دمو)
    updateTaskInFile(taskId, updates);
  };
  // Add, Delete، ... نیز می‌توان اضافه کرد
  return (
    <TaskContext.Provider value={{ tasks, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}
export const useTasks = () => useContext(TaskContext);
