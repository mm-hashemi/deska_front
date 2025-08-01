"use client";
import { useState } from "react";
import {
  FaUserCircle, FaRegClock, FaRegCheckCircle, FaEdit, FaTrash,
  FaPaperclip, FaTag, FaLink, FaSave
} from "react-icons/fa";
import clsx from "clsx";

// COLORS SAMPLE
const COLORS = [
  "#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#A3E635",
];

export default function TaskDetails({
  task: initialTask,
  allTasks = [],
  onUpdateTask,
  onDeleteAttachment,
  onAddAttachment,
}) {
  // State main
  const [task, setTask] = useState(initialTask);
  const [isSaving, setIsSaving] = useState(false);

  // Copy of the initial task for "dirty checking"
  const [originalTask, setOriginalTask] = useState(initialTask);

  // Flag for changes
  const isDirty = JSON.stringify(task) !== JSON.stringify(originalTask);

  // In-place edits (just local state)
  const handleChange = (field, value) => {
    setTask(t => ({ ...t, [field]: value }));
  };

  // Tags
  const handleTagAdd = (tag) => {
    if (!tag) return;
    if (!task.tags.includes(tag)) {
      setTask(t => ({
        ...t,
        tags: [...t.tags, tag],
      }));
    }
  };
  const handleTagRemove = (tag) => {
    setTask(t => ({
      ...t,
      tags: t.tags.filter(tg => tg !== tag),
    }));
  };

  // Dependencies
  const handleDependencyChange = (deps) => {
    setTask(t => ({ ...t, dependencies: deps }));
  };

  // Attachments
  const handleAttach = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fakeAttachment = {
      id: crypto.randomUUID(),
      fileName: file.name,
      url: URL.createObjectURL(file),
    };
    setTask(t => ({
      ...t,
      attachments: [...(t.attachments || []), fakeAttachment],
    }));
    if (onAddAttachment) onAddAttachment(fakeAttachment);
  };
  const handleDeleteAttach = (attId) => {
    setTask(t => ({
      ...t,
      attachments: t.attachments.filter(a => a.id !== attId),
    }));
    if (onDeleteAttachment) onDeleteAttachment(attId);
  };

  // Tag input
  const [newTag, setNewTag] = useState("");

  // --- دکمه ذخیره ---
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onUpdateTask) await onUpdateTask(task);
      setOriginalTask(task); // این مهم است: dirty=false
    } finally {
      setIsSaving(false);
    }
  };

  if (!task) return <p>Task not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/90 dark:bg-zinc-900 rounded-xl shadow relative">
      {/* دکمه ذخیره */}
      <button
        onClick={handleSave}
        disabled={isSaving || !isDirty}
        className={clsx(
          "absolute left-5 top-5 px-4 py-2 rounded transition flex items-center gap-2",
          isDirty
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-200 text-white cursor-not-allowed"
        )}
        title="ذخیره تغییرات"
      >
        <FaSave />
        {isSaving ? "در حال ذخیره..." : "ذخیره"}
      </button>

      {/* عنوان + رنگ تسک */}
      <div className="flex items-center gap-2 mb-4">
        <input
          className="font-bold text-2xl bg-transparent outline-none border-none flex-1"
          value={task.title}
          onChange={e => handleChange("title", e.target.value)}
        />
        <input
          type="color"
          value={task.color || "#A78BFA"}
          onChange={e => handleChange("color", e.target.value)}
          title="Task Color"
          className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 cursor-pointer"
        />
      </div>
      {/* Description */}
      <textarea
        className="w-full mt-2 p-2 text-gray-800 rounded-md bg-gray-100 dark:bg-zinc-800"
        rows={3}
        value={task.description || ""}
        onChange={e => handleChange("description", e.target.value)}
        placeholder="Description..."
      />

      {/* بخش وضعیت، مسئول، تاریخ */}
      <div className="grid grid-cols-2 gap-4 my-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Assigned to:</label>
          <input
            type="text"
            className="w-full p-1 rounded bg-gray-50 border"
            value={task.assignee}
            onChange={e => handleChange("assignee", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Due date:</label>
          <input
            type="date"
            className="w-full p-1 rounded bg-gray-50 border"
            value={task.due}
            onChange={e => handleChange("due", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Status:</label>
          <select
            className="w-full p-1 rounded bg-gray-50 border"
            value={task.status}
            onChange={e => handleChange("status", e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
      {/* تگ‌ها */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <FaTag className="text-gray-500" />
        {task.tags?.map(tag => (
          <span key={tag}
            className="px-2 py-0.5 bg-blue-100 rounded text-xs flex items-center gap-1"
          >
            {tag}
            <button type="button" className="text-red-400 hover:text-red-600 inline" onClick={() => handleTagRemove(tag)}>×</button>
          </span>
        ))}
        <input
          className="border text-xs rounded px-1 py-0.5 w-20"
          placeholder="+ Tag"
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { handleTagAdd(newTag.trim()); setNewTag(""); } }}
        />
      </div>
      {/* وابستگی‌ها */}
      <div className="mt-4">
        <div className="font-semibold flex items-center gap-1 mb-2">
          <FaLink className="text-gray-400"/> Dependencies
        </div>
        <select
          multiple
          className="border rounded p-1 bg-gray-100 dark:bg-zinc-800"
          value={task.dependencies || []}
          onChange={e => {
            const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
            handleDependencyChange(values);
          }}
        >
          {(allTasks.filter(t => t.id !== task.id)).map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>
      {/* پیوست‌ها */}
      <div className="mt-4">
        <div className="font-semibold flex items-center gap-1 mb-2">
          <FaPaperclip className="text-gray-400"/> Attachments
        </div>
        <div className="flex flex-col gap-2">
          {(task.attachments || []).map(att =>
            <div key={att.id} className="flex items-center gap-2 text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
              <a href={att.url} target="_blank" rel="noopener noreferrer" className="underline flex-1">{att.fileName}</a>
              <button type="button" onClick={() => handleDeleteAttach(att.id)} title="Remove" className="text-red-400 px-2 hover:text-red-600"><FaTrash /></button>
            </div>
          )}
        </div>
        <label className="mt-2 inline-block">
          <input type="file" className="hidden" onChange={handleAttach} />
          <button type="button" className="mt-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs flex items-center gap-1">
            <FaPaperclip /> Add Attachment
          </button>
        </label>
      </div>
    </div>
  );
}
