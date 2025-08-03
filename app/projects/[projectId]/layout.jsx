'use client'
import DashboardHeader from "@/components/headerDash";
import Sidebar from "@/components/sidebar";
import TaskViewsBar from "@/components/taskviewbar";
import { TaskViewProvider } from "@/context/TaskViewContext";

export default function Layout({ children }) {
  return (
    <>
    
     <div className="flex w-full">
           <TaskViewProvider>

          
          <div className="w-full flex flex-col">
        
            <TaskViewsBar />
          {children}
           </div>
              
           </TaskViewProvider>
    </div>

    </>
  );
}