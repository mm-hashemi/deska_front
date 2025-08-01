'use client'
import { FaCalendarAlt, FaTable, FaTasks, FaFolderOpen } from "react-icons/fa"
import { RiFlowChart } from "react-icons/ri"
import { BsDiagram3 } from "react-icons/bs"
import { useTaskView } from "@/context/TaskViewContext";


const VIEWS = [
 
    { label: "Tasks", value: "tasks", icon: <FaTasks /> },
    { label: "Kanban", value: "kanban", icon: <RiFlowChart /> },
  { label: "Calendar", value: "calendar", icon: <FaCalendarAlt /> },
  { label: "Gantt", value: "gantt", icon: <BsDiagram3 /> },
  { label: "Members", value: "members", icon: <FaTable /> },
];

export default function TaskViewsBar() {
  const { activeView, setActiveView } = useTaskView()

  return (
    <div className="w-full flex gap-1 px-8 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-[#23263a]/70 backdrop-blur z-10">
      {VIEWS.map((v) => (
        <button
          key={v.value}
          type="button"
          className={[
            "flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium text-sm",
            activeView === v.value
              ? "bg-blue-500 text-white shadow"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-200"
          ].join(" ")}
          onClick={() => setActiveView(v.value)}
        >
          <span className="text-base">{v.icon}</span>
          <span>{v.label}</span>
        </button>
      ))}
    </div>
  )
}
