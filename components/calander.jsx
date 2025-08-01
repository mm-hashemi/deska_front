'use client'
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCircle, FaRegCalendarAlt } from "react-icons/fa";
import clsx from "clsx";

// Sample data - You should import this from your project data file
const tasks = [
  {
    id: "1",
    title: "Landing page UI & SEO",
    status: "In Progress",
    date: "2025-08-02",
    projectId: "redesign", // <-- Add projectId!
    project: { name: "Redesign", color: "#32b9ff" },
  },
  {
    id: "2",
    title: "Dockerize Backend",
    status: "Todo",
    date: "2025-08-03",
    projectId: "infra",
    project: { name: "Infra", color: "#ffab2e" },
  },
  // ...
];

const STATUS_COLORS = {
  Todo: "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  Done: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};
const STATUS_DOT = {
  Todo: "text-zinc-500",
  "In Progress": "text-blue-500",
  Done: "text-green-500",
};

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMonthDays(year, month) {
  const result = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const isoString = dateObj.toISOString().slice(0, 10);
    result.push({ dateObj, isoString, tasks: [] });
  }
  return result;
}

// If used as /projects/[projectId]/calendar/page.jsx
export default function TaskCalendar({ params }) {
  const { projectId } = params || useParams(); // fallback if you use 'useParams'

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const router = useRouter();

  // ** Filter tasks for this projectId **
  // If you get param as string ("12" or "redesign") correct as needed!
  const projectTasks = tasks.filter(t => String(t.projectId) === String(projectId));

  // ** Prepare days **
  const monthDays = getMonthDays(year, month);
  for (const t of projectTasks) {
    const idx = monthDays.findIndex(d => d.isoString === t.date);
    if (idx !== -1) monthDays[idx].tasks.push(t);
  }

  // Split into weeks
  const weeks = [];
  let week = Array((new Date(year, month, 1).getDay())).fill(null);
  for (const day of monthDays) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);

  // Calendar rendering
  return (
    <div className="w-full mx-auto bg-white dark:bg-[#23263a] rounded-2xl shadow-xl p-6 mt-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt className="text-blue-500 text-lg" />
          <h2 className="text-lg font-bold">
            {new Date(year,month,1).toLocaleString('default', { month: 'long' })}&nbsp;{year}
          </h2>
        </div>
        {/* Prev / Next month */}
        <div className="flex gap-1">
          <button
            className="w-8 h-8 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center"
            onClick={() => {
              if (month === 0) {
                setMonth(11)
                setYear(y => y - 1)
              } else setMonth(m => m - 1)
            }}
            title="Prev month"
            aria-label="Previous month"
          >←</button>
          <button
            className="w-8 h-8 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center"
            onClick={() => {
              if (month === 11) {
                setMonth(0)
                setYear(y => y + 1)
              } else setMonth(m => m + 1)
            }}
            title="Next month"
            aria-label="Next month"
          >→</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center select-none">
        {weekdayLabels.map(w => (
          <div key={w} className="pb-2 text-xs font-bold text-zinc-500">{w}</div>
        ))}
        {/* Days */}
        {weeks.map((week, i) => (
          week.map((day, j) => day ? (
            <div key={day.isoString} className={clsx(
              "rounded-xl px-2 min-h-[86px] pb-1 pt-2 border border-transparent flex flex-col bg-zinc-50 dark:bg-zinc-800 relative group",
              day.dateObj.toDateString() === today.toDateString()
                ? "border-blue-400 ring-2 ring-blue-300 dark:ring-blue-900"
                : "hover:border-blue-500 transition"
            )}>
              <div className="flex items-center justify-between mb-1">
                <div className={clsx(
                  "font-semibold text-base",
                  day.dateObj.toDateString() === today.toDateString()
                    ? "text-blue-600" : "text-zinc-700 dark:text-zinc-100"
                )}>
                  {day.dateObj.getDate()}
                </div>
                {day.dateObj.toDateString() === today.toDateString() &&
                  <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
              {day.tasks.map((task, k) => (
                <div
                  key={task.id}
                  className={clsx(
                    "flex gap-1 items-center px-2 py-0.5 rounded-lg mt-1 cursor-pointer text-xs",
                    STATUS_COLORS[task.status],
                    "hover:bg-opacity-80 hover:scale-[1.025] transition"
                  )}
                  title={task.title}
                  onClick={e => {
                    e.stopPropagation();
                    router.push(`/tasks/${task.id}`);
                  }}
                >
                  <FaCircle className={clsx("text-[8px]", STATUS_DOT[task.status])} />
                  <span className="truncate">{task.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div key={`empty-${i}-${j}`} />
          ))
        ))}
      </div>
      {/* If no tasks */}
      {projectTasks.length === 0 &&
        <div className="text-center text-zinc-400 py-12 font-semibold">No tasks for this project in this month.</div>
      }
    </div>
  );
}
