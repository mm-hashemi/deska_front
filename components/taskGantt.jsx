import React, { useRef, useState } from "react";
import clsx from "clsx";

// Sample status colors for pips:
const STATUS = {
  "not started": "bg-zinc-300",
  "in progress": "bg-blue-400",
  done: "bg-green-400",
};

// Gantt data
const GROUPS = [
  { id: 1, name: "Market Research", duration: "10d", status: "in progress", progress: 70 },
  { id: 2, name: "Competitor Analysis", duration: "7d", status: "done", progress: 100 },
  { id: 3, name: "Goal Definition", duration: "5d", status: "in progress", progress: 40 },
  { id: 4, name: "Wireframing", duration: "5d", status: "done", progress: 100 },
  { id: 5, name: "Prototyping", duration: "8d", status: "in progress", progress: 55 },
];

const TASKS = [
  {
    id: "t1",
    groupId: 1,
    title: "Stakeholder Interviews",
    color: "#6F9AFF",
    start: 0,
    end: 2,
    status: "in progress",
    people: ["🟠", "🟡"],
  },
  {
    id: "t2",
    groupId: 2,
    title: "Survey Writeup",
    color: "#63E6BE",
    start: 1,
    end: 4,
    status: "done",
    people: ["🟢"],
  },
  {
    id: "t3",
    groupId: 3,
    title: "Persona Mapping",
    color: "#FFB86F",
    start: 2,
    end: 3,
    status: "in progress",
    people: ["🟣", "🧑🏻"],
  },
  {
    id: "t4",
    groupId: 4,
    title: "Wireframe v1",
    color: "#B07CFF",
    start: 3,
    end: 6,
    status: "done",
    people: ["🟠", "💚"],
  },
  {
    id: "t5",
    groupId: 5,
    title: "Figma Prototype",
    color: "#FF7474",
    start: 5,
    end: 7,
    status: "in progress",
    people: ["🟤", "💙"],
  },
];
const DATES = [
  { label: "Mon", num: "25", isToday: false },
  { label: "Tue", num: "26", isToday: false },
  { label: "Wed", num: "27", isToday: true },
  { label: "Thu", num: "28", isToday: false },
  { label: "Fri", num: "29", isToday: false },
  { label: "Sat", num: "30", isToday: false },
  { label: "Sun", num: "31", isToday: false },
  { label: "Mon", num: "1", isToday: false },
  { label: "Tue", num: "2", isToday: false }
];

// ModernGanttUltraMinimal Component
export default function ModernGanttUltraMinimal() {
  const [contextMenu, setContextMenu] = useState(null);
  const ref = useRef();

  React.useEffect(() => {
    function closeMenu(e) {
      if (contextMenu && ref.current && !ref.current.contains(e.target)) setContextMenu(null);
    }
    if (contextMenu) document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [contextMenu]);

  return (
    <div className="max-w-5xl w-full mx-auto my-12 rounded-2xl bg-white dark:bg-[#181a24] border border-zinc-200/60 dark:border-zinc-800/80 shadow-xl overflow-x-auto transition" ref={ref}
    >
      {/* Sticky glassy column+date header */}
      <div className="flex border-b border-zinc-100 dark:border-zinc-800/40 bg-white/70 dark:bg-[#22252f]/60 backdrop-blur-md sticky top-0 z-20">
        {/* Group column header */}
        <div className="w-[210px] py-3 pl-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wider select-none">
          TASK GROUP
        </div>
        {/* Date grid header (glassy) */}
        <div className="flex-1 flex min-w-[590px] px-2">
          {DATES.map((d, i) => (
            <div
              key={i}
              className={clsx(
                "flex-1 text-center px-1 py-3 text-xs font-semibold transition rounded-lg",
                d.isToday
                  ? "bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-200 ring-2 ring-blue-200 dark:ring-blue-800"
                  : "text-zinc-400"
              )}
            >
              <span>{d.label}</span>
              <div className="text-sm font-bold mt-1">
                {d.num}
                {d.isToday && (
                  <span className="ml-1 px-2 text-xs py-0.5 rounded bg-blue-200 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-semibold">Today</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gantt Rows */}
      <div className="relative overflow-y-visible">
        {/* Grid lines */}
        <div className="absolute left-[210px] right-0 top-0 h-full z-0 pointer-events-none">
          <div className="flex h-full min-w-[590px]">
            {DATES.map((_, i) => (
              <div key={i} className="flex-1 border-r border-dashed border-zinc-100 dark:border-zinc-800/80" />
            ))}
          </div>
        </div>

        {/* Gantt Content */}
        <div className="">
          {GROUPS.map((group, i) => {
            const rowTasks = TASKS.filter((t) => t.groupId === group.id);
            return (
              <div key={group.id} className={clsx("flex items-center h-14 group hover:bg-blue-50/35 dark:hover:bg-zinc-900/50 relative z-10 transition")}>
                {/* Sidebar (task group col) */}
                <div className="w-[210px] flex flex-col pl-6 pr-3">
                  <div className="flex items-center gap-2">
                    {/* Status pip */}
                    <span className={clsx(
                      "inline-block w-2 h-2 rounded-full",
                      STATUS[group.status] || "bg-zinc-400"
                    )} />
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm truncate">{group.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-zinc-400 font-mono">{group.duration}</span>
                    {/* Minimal progress pill */}
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full w-14 mt-0.5">
                      <div className="h-2 rounded-full transition-all duration-500"
                        style={{
                          background: group.progress === 100
                            ? "linear-gradient(90deg,#4ade80,#60a5fa)"
                            : "linear-gradient(90deg,#3b82f6,#fbbf24)",
                          width: `${group.progress}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Gantt task bars */}
                <div className="flex-1 relative min-w-[590px] h-full">
                  {rowTasks.map((t, idx) => {
                    // timeline math
                    const left = t.start * 100 + 13; // px; margin left for Gantt columns
                    const width = (t.end - t.start + 1) * 100 - 16;
                    return (
                      <div
                        key={t.id}
                        style={{
                          left,
                          width,
                          background: t.color + "28",
                          border: `1.5px solid ${t.color}`,
                          boxShadow: "0 2px 14px 0 " + t.color + "25"
                        }}
                        className={clsx(
                          "absolute flex items-center px-4 h-8 rounded-2xl z-10",
                          "hover:shadow-2xl hover:border-blue-500 transition-all duration-150",
                          "cursor-pointer group/task"
                        )}
                        tabIndex={0}
                        onContextMenu={e => {
                          e.preventDefault();
                          setContextMenu({ x: e.clientX, y: e.clientY, task: t });
                        }}
                      >
                        {/* Status pip - matches status */}
                        <span className={clsx(
                          "inline-block w-2 h-2 rounded-full mr-2",
                          STATUS[t.status] || "bg-zinc-400"
                        )} />
                        <span className="font-medium text-[13px] text-zinc-900 dark:text-white truncate max-w-[120px]">{t.title}</span>
                        {/* Avatars – overlap float right */}
                        <div className="flex items-center -space-x-2 ml-4">
                          {t.people.map((p,index)=>
                            <span key={index}
                              className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 flex items-center justify-center text-lg z-20 shadow"
                            >{p}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          style={{
            position: "fixed",
            left: contextMenu.x + 8,
            top: contextMenu.y - 8,
            zIndex: 9999,
            minWidth: 180,
          }}
          className="rounded-xl shadow-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3 px-2 animate-fadein"
        >
          <div className="flex gap-2 mb-2 px-2">
            {["#6F9AFF","#63E6BE","#FFB86F","#B07CFF","#FF7474","#ffa5f3"].map((c) =>
              <button
                key={c}
                className={clsx("w-5 h-5 rounded-full border-2 border-white/80")}
                style={{
                  background: c,
                  outline: c === contextMenu.task.color ? "2px solid #333" : "none"
                }}
                aria-label={c}
              />
            )}
          </div>
          {[
            { label: "Edit", icon: "✏️" },
            { label: "Duplicate", icon: "⧉" },
            { label: "Copy Link", icon: "🔗" },
            { label: "Delete", icon: "🗑️", danger: true },
          ].map(item => (
            <button
              key={item.label}
              className={clsx(
                "w-full flex items-center gap-2 px-4 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 group",
                item.danger && "text-rose-700 font-bold"
              )}
              onClick={() => setContextMenu(null)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Fade in for context menu, responsive tweaks */}
      <style>{`
        .animate-fadein { animation: fadeIn .14s cubic-bezier(.4,0,.2,1);}
        @keyframes fadeIn {from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}}
      `}</style>
    </div>
  );
}
