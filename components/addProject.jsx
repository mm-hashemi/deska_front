import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

// Sample statuses -- change as needed:
const statuses = [
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'planning', label: 'Planning', color: 'bg-blue-500' },
  { value: 'archived', label: 'Archived', color: 'bg-zinc-400' },
]

// Project color samples (Linear/Jira style)
const projectColors = [
  '#2563eb', // blue-600
  '#059669', // green-600
  '#f59e42', // amber-500
  '#be185d', // pink-700
  '#334155', // slate-700
  '#f43f5e', // red-500
]

export default function AddProjectModal({
  open,
  onClose,
  onSubmit,
  members = [],
}) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    manager: members[0]?.id ?? '',
    status: 'active',
    color: projectColors[0],
    startDate: '',
    endDate: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Reset form
  useEffect(() => {
    if(open) {
      setForm({
        name: '',
        description: '',
        manager: members[0]?.id ?? '',
        status: 'active',
        color: projectColors[0],
        startDate: '',
        endDate: '',
      })
      setError('')
    }
  }, [open, members])

  // ESC to close
  useEffect(() => {
    if(!open) return
    const esc = e => e.key === "Escape" && onClose()
    document.addEventListener("keydown", esc)
    return () => document.removeEventListener("keydown", esc)
  }, [open, onClose])

  if(!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal"
        tabIndex={-1}
      />
      <div
        className="relative bg-white dark:bg-zinc-900 max-w-lg w-full p-8 rounded-2xl shadow-2xl animate-fadeIn mx-2"
        role="dialog"
        aria-modal="true"
        tabIndex={0}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Add New Project</h3>
          <button
            className="text-zinc-400 dark:text-zinc-500 text-2xl hover:text-red-400 px-2 -my-2"
            onClick={onClose}
            title="Close"
          >&times;</button>
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault()
            if (!form.name.trim()) return setError("Project name is required!")
            if (!form.manager) return setError("Project manager is required")
            setError('')
            setSubmitting(true)
            Promise.resolve(onSubmit(form))
              .then(() => setSubmitting(false))
              .catch(() => setSubmitting(false))
          }}
        >
          <label className="font-medium text-zinc-700 dark:text-zinc-200 text-base">
            Project Name <span className="text-red-500 align-super">*</span>
            <input
              required
              maxLength={128}
              value={form.name}
              onChange={e=>setForm(f=>({...f, name: e.target.value}))}
              placeholder="Enter a project name"
              className="block mt-1 w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm focus:border-blue-400 focus:outline-none"
            />
          </label>
          <label className="font-medium text-zinc-700 dark:text-zinc-200 text-base">
            Description
            <textarea
              value={form.description}
              onChange={e=>setForm(f=>({...f, description: e.target.value}))}
              placeholder="Describe the project goals, scope, and requirements..."
              rows={3}
              className="block mt-1 w-full resize-none bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-normal text-sm focus:border-blue-400 focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-700 dark:text-zinc-200 text-base mb-1">Manager</span>
              <select
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm"
                value={form.manager}
                onChange={e=>setForm(f=>({...f, manager: +e.target.value }))}
              >
                {members.map(m=>(
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-700 dark:text-zinc-200 text-base mb-1">Status</span>
              <select
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm"
                value={form.status}
                onChange={e=>setForm(f=>({...f, status: e.target.value}))}
              >
                {statuses.map(s=>
                  <option key={s.value} value={s.value}>{s.label}</option>
                )}
              </select>
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-700 dark:text-zinc-200 text-base mb-1">Start Date</span>
              <input
                type="date"
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-normal text-sm"
                value={form.startDate}
                onChange={e=>setForm(f=>({...f, startDate: e.target.value}))}
              />
            </label>
            <label className="flex flex-1 flex-col min-w-[120px]">
              <span className="font-medium text-zinc-700 dark:text-zinc-200 text-base mb-1">End Date</span>
              <input
                type="date"
                className="w-full bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-normal text-sm"
                value={form.endDate}
                onChange={e=>setForm(f=>({...f, endDate: e.target.value}))}
                min={form.startDate || undefined}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <label className="font-medium text-zinc-700 dark:text-zinc-200 text-base">Color:</label>
            <div className="flex flex-row gap-2">
              {projectColors.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  title={c}
                  className={clsx(
                    "w-7 h-7 rounded-full border-2 mr-0.5 flex-shrink-0 flex items-center justify-center",
                    form.color === c
                      ? "border-blue-600 shadow-lg ring ring-blue-200"
                      : "border-zinc-200 dark:border-zinc-700"
                  )}
                  style={{ background: c }}
                  onClick={()=>setForm(f=>({...f, color: c}))}
                  tabIndex={0}
                >
                  {form.color === c && (
                    <span className="text-white text-xl">&#10003;</span>
                  )}
                </button>
              ))}
            </div>
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
              {submitting ? "Adding..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
