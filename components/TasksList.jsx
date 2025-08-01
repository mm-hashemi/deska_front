"use client";
import { useState } from "react";
import { FaPlus, FaUserCircle, FaRegCheckCircle, FaRegClock, FaTrash } from "react-icons/fa";
import Link from "next/link";
import clsx from "clsx";
import AddTaskModal from "./addTaskModal";

const STATUS_STYLE = {
  todo: "border-gray-300 bg-white text-gray-800",
  inprogress: "border-blue-300 bg-blue-50 text-blue-700",
  done: "border-green-300 bg-green-50 text-green-700",
  blocked: "border-red-300 bg-red-50 text-red-700",
};

export default function TasksList() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([
    { id: "1", title: "Design new login button", assignee: "Mark", status: "todo", due: "2025-08-10" },
    { id: "2", title: "API integration", assignee: "Neda", status: "inprogress", due: "2025-08-12" },
    { id: "3", title: "Fix comment bug", assignee: "Reza", status: "blocked", due: "2025-08-25" },
    { id: "4", title: "Final QA tests", assignee: "Zara", status: "done", due: "2025-08-08" },
  ]);

  const handleAddTask = (task) => {
    setShowModal(false);
    if (!task) return;
    setTasks(prevTasks => [
      ...prevTasks,
      {
        ...task,
        id: crypto.randomUUID(),
      }
    ]);
  };

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Task List</h2>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="text-md" />
          Add Task
        </button>
      </div>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={clsx(
              "flex items-center justify-between rounded-xl border p-4 shadow transition-all hover:shadow-lg",
              STATUS_STYLE[task.status] || STATUS_STYLE["todo"]
            )}
          >
            {/* clickable area: همه محتوای تسک (به جز دکمه حذف) */}
            <Link
              href={`/tasks/${task.id}`}
              className="flex flex-col gap-2 flex-1 cursor-pointer min-w-0"
              tabIndex={0}
            >
              <span className="text-lg font-medium line-clamp-1">{task.title}</span>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <FaUserCircle className="text-lg text-gray-400" />
                  {task.assignee}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegClock className="text-md text-gray-400" />
                  {new Date(task.due).toLocaleDateString("en-US")}
                </span>
              </div>
            </Link>
            <div className="flex flex-col items-end gap-2 ml-4">
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    "inline-block px-3 py-1 rounded-full border text-xs font-semibold",
                    {
                      "border-green-400 text-green-700 bg-green-50": task.status === "done",
                      "border-blue-400 text-blue-700 bg-blue-50": task.status === "inprogress",
                      "border-red-400 text-red-700 bg-red-50": task.status === "blocked",
                      "border-gray-300 text-gray-600 bg-white": task.status === "todo",
                    }
                  )}
                >
                  {task.status === "todo" && "To Do"}
                  {task.status === "inprogress" && "In Progress"}
                  {task.status === "done" && "Done"}
                  {task.status === "blocked" && "Blocked"}
                </span>
                <button
                  className="ml-2 text-red-500 hover:text-red-700 transition"
                  title="حذف تسک"
                  onClick={() => handleDeleteTask(task.id)}
                  tabIndex={0}
                >
                  <FaTrash />
                </button>
              </div>
              {task.status === "done" && (
                <FaRegCheckCircle className="text-green-500 text-lg mt-1" title="Done" />
              )}
            </div>
          </li>
        ))}
      </ul>
      <AddTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTask}
      />
    </section>
  );
}
