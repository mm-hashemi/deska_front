'use client'
import DashboardHeader from "@/components/headerDash";
import Sidebar from "@/components/sidebar";
import TaskViewsBar from "@/components/taskviewbar";
import { TaskViewProvider } from "@/context/TaskViewContext";
import { ThemeProvider } from "next-themes"

export default function Layout({ children }) {
  return (
    <>
        
     <div className="flex w-full dark:bg-[#1d202a] ">
           <TaskViewProvider>

           <Sidebar/>
          <div className="w-full flex flex-col">
          <DashboardHeader/>
           
          {children}
           </div>
              
           </TaskViewProvider>
    </div>
         

    </>
  );
}