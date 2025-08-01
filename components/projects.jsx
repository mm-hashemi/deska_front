// ProjectKanbanBoard.jsx
'use client'
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  FiSun, FiMoon, FiPlus, FiSearch, FiBell, FiChevronDown
} from "react-icons/fi";

// Demo avatars (swap with your public avatars or ui-avatars.com)
const people = [
  { name: "Zahra", img: "/avatars/za.jpg" },
  { name: "Ali", img: "/avatars/ali.jpg" },
  { name: "Farzaneh", img: "/avatars/far.jpg" },
  { name: "Reza", img: "/avatars/reza.jpg" }
];

const initialData = {
  columns: [
    {
      id: 'todo',
      name: 'To Do',
      color: 'from-[#C8D3F9] to-[#DEE7FF]',
      tasks: [
        {
          id: 't1',
          content: 'Design wireframes for admin view',
          lead: people[0],
          date: "2025-07-31",
          status: "To Do"
        },
        {
          id: 't2',
          content: 'Gather dashboard requirements',
          lead: people[1],
          date: "2025-07-27",
          status: "To Do"
        }
      ]
    },
    {
      id: 'inprogress',
      name: 'In Progress',
      color: 'from-[#E0EEF7] to-[#D5FBFF]',
      tasks: [
        {
          id: 't3',
          content: 'Implement project status Kanban UI',
          lead: people[2],
          date: "2025-07-29",
          status: "In Progress"
        }
      ]
    },
    {
      id: 'done',
      name: 'Done',
      color: 'from-[#C2FFD3] to-[#D0FFE1]',
      tasks: [
        {
          id: 't4',
          content: 'Setup authentication system',
          lead: people[3],
          date: "2025-07-24",
          status: "Done"
        }
      ]
    }
  ]
};

const statusColors = {
  "To Do": "bg-gray-300 text-gray-700",
  "In Progress": "bg-yellow-300 text-yellow-900",
  "Done": "bg-green-400 text-green-900"
};

const accent = "text-[#577DFC]";

export default function ProjectKanbanBoard() {
  const [dark, setDark] = useState(true);
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Search filter
  const getFilteredColumns = () => {
    if (!search.trim()) return data.columns;
    return data.columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(t =>
        t.content.toLowerCase().includes(search.toLowerCase())
      )
    }));
  };

  // DnD handler
  function onDragEnd(result) {
    if (!result.destination) return;
    const sColI = data.columns.findIndex(c => c.id === result.source.droppableId);
    const dColI = data.columns.findIndex(c => c.id === result.destination.droppableId);
    const [moved] = data.columns[sColI].tasks.splice(result.source.index, 1);
    data.columns[dColI].tasks.splice(result.destination.index, 0, moved);
    setData({ columns: [...data.columns] });
  }

  return (
    <div className={`min-h-screen w-full bg-gradient-to-tr from-[#F6F8FC] to-white dark:from-[#141627] dark:to-[#23272f] px-0 pb-10 transition`}>
    
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 mb-0 max-w-7xl mx-auto">
        <div className="flex max-w-xs w-full gap-2 items-center bg-white/80 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 shadow">
          <FiSearch className="opacity-50" />
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-0 py-1 text-base"
          />
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#5B8BFF] to-[#5EDBCE] text-white py-2 px-5 rounded-full shadow-lg font-bold active:scale-95 transition">
          <FiPlus /> Add Task
        </button>
      </div>
      {/* Kanban Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="flex gap-6 overflow-x-auto mt-8 px-2 max-w-7xl mx-auto sm:px-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-[#23304C]/60">
          {getFilteredColumns().map((col, i) => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided, snapshot) => (
                <section
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`
                    w-[310px] flex-shrink-0
                    bg-gradient-to-br ${col.color} dark:from-[#1C223C] dark:to-[#222B3F]
                    rounded-2xl border border-slate-200 dark:border-[#27314D]
                    shadow-xl p-5 pb-7
                    flex flex-col
                    transition-all min-h-[430px]
                  `}
                  style={{
                    boxShadow: snapshot.isDraggingOver
                      ? "0 0 0 6px #5B8BFF22"
                      : "var(--tw-shadow-xl)"
                  }}
                >
                  <h2 className="font-extrabold text-lg mb-4 text-[#334288] dark:text-[#95B3FF] flex items-center gap-2">
                    {col.name}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-[#253354]/70 text-blue-600 dark:text-blue-200 ml-auto">{col.tasks.length}</span>
                  </h2>
                  <div className="flex-1 flex flex-col gap-4 min-h-[320px]">
                    {col.tasks.map((t, idx) => (
                      <Draggable key={t.id} draggableId={t.id} index={idx}>
                        {(provided, snapshot) => (
                          <article
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                              bg-white/90 dark:bg-[#191E2B]/95 border border-gray-100 dark:border-slate-800 shadow-lg rounded-xl p-4 cursor-grab
                              ${snapshot.isDragging ? "scale-[1.03] shadow-2xl border-blue-400" : "hover:shadow-xl"}
                              transition-all duration-100
                              flex flex-col gap-2
                              select-none
                            `}
                          >
                            <div className="flex gap-2 items-center justify-between mb-1">
                              <div className={`px-3 py-0.5 rounded-full text-xs font-bold ${statusColors[t.status]}`}>{t.status}</div>
                              <span className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}</span>
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100">{t.content}</div>
                            <div className="flex items-center gap-2 mt-3">
                              <img src={t.lead.img} alt="" className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 shadow" />
                              <span className="text-xs text-slate-500 dark:text-slate-300 font-bold">{t.lead.name}</span>
                            </div>
                          </article>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {col.tasks.length === 0 && (
                      <div className="text-center text-xs text-slate-400 my-10">No tasks</div>
                    )}
                  </div>
                </section>
              )}
            </Droppable>
          ))}
        </main>
      </DragDropContext>
    </div>
  );
}
