'use client'
import DashboardHeader from "@/components/headerDash";
import Sidebar from "@/components/sidebar";
import { TaskViewProvider } from "@/context/TaskViewContext";

export default function Layout({ children }) {
  return (
    <>
    
     <div className="flex w-full">
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