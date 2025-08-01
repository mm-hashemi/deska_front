import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

// Supply members prop from parent or context
const statuses = [
  { value: 'todo', label: 'To do', color: 'bg-zinc-200 text-zinc-700' },
  { value: 'doing', label: 'In progress', color: 'bg-blue-100 text-blue-700' },
  { value: 'done', label: 'Done', color: 'bg-green-100 text-green-700' },
];
const priorities = [
  { value: 'A', label: 'A', color: 'bg-red-500' },
  { value: 'B', label: 'B', color: 'bg-yellow-400' },
  { value: 'C', label: 'C', color: 'bg-green-500' },
];

export default function AddTaskModal({
  open,
  onClose,
  onSubmit,
  members = [],
}) {
  const ref = useRef();

  // Initial state ensures 'assignee' is always a string (or '' if no member)
  const getInitialForm = () => ({
    title: '',
    description: '',
    assignee: members[0]?.id?.toString() || '',
    status: 'todo',
    prio: 'B',
    due: '',
  });

  const [form, setForm] = useState(getInitialForm());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset form when modal opens or members change
  useEffect(() => {
    if (open) {
      setForm(getInitialForm());
      setError('');
    }
    // eslint-disable-next-line
  }, [open]);

  // Handle Escape to close modal
  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal"
        tabIndex={-1}
      />
      <div
        ref={ref}
        tabIndex={0}
        className="relative bg-white dark:bg-zinc-900 max-w-lg w-full rounded-2xl shadow-xl p-8 mx-2 animate-fadeIn"
        style={{ minWidth: 320 }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-zinc-900 dark:text-white text-xl">Add New Task</h3>
          <button
            className="text-zinc-400 dark:text-zinc-500 text-2xl leading-none hover:text-red-400 px-1 -my-2"
            title="Close"
            onClick={onClose}
            type="button"
          >&times;</button>
        </div>
        <form className="flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!form.title.trim()) {
              setError('Task title is required');
              return;
            }
            setError('');
            setSubmitting(true);
            try {
              await Promise.resolve(onSubmit(form));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <label className="font-medium text-zinc-600 dark:text-zinc-200 text-[15px]">
            Task Title <span className="text-red-500 align-super">*</span>
            <input
              className="block mt-1 w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium text-sm focus:border-blue-400 focus:outline-none"
              required
              maxLength={120}
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Write a descriptive title..."
            />
          </label>
          <label className="font-medium text-zinc-600 dark:text-zinc-200 text-[15px]">
            Description
            <textarea
              className="block mt-1 w-full resize-none bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium text-sm focus:border-blue-400 focus:outline-none"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Explain what needs to be done..."
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-600 dark:text-zinc-200 text-[15px] mb-1">Assignee</span>
              <select
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium text-sm"
                value={form.assignee}
                onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}
              >
                {members.length === 0 ? (
                  <option value="">No members</option>
                ) : (
                  members.map((m) =>
                    <option key={m.id} value={m.id.toString()}>
                      {m.name}
                    </option>
                  )
                )}
              </select>
            </label>
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-600 dark:text-zinc-200 text-[15px] mb-1">Status</span>
              <select
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium text-sm"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              >
                {statuses.map(s =>
                  <option key={s.value} value={s.value}>{s.label}</option>
                )}
              </select>
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-600 dark:text-zinc-200 text-[15px] mb-1">Priority</span>
              <select
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium text-sm"
                value={form.prio}
                onChange={e => setForm(f => ({ ...f, prio: e.target.value }))}
              >
                {priorities.map(s =>
                  <option key={s.value} value={s.value}>P{s.label}</option>
                )}
              </select>
            </label>
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-600 dark:text-zinc-200 text-[15px] mb-1">Due date</span>
              <input
                type="date"
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium text-sm"
                value={form.due}
                onChange={e => setForm(f => ({ ...f, due: e.target.value }))}
              />
            </label>
          </div>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          <div className="flex items-center justify-between mt-4 gap-4">
            <button
              type="button"
              className="rounded-lg px-4 py-2 font-bold text-zinc-500 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 transition"
              onClick={onClose}
            >Cancel</button>
            <button
              type="submit"
              className="rounded-lg px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
