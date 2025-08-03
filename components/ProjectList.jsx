'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaFolderOpen, FaPlus } from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import { projects as projectData } from '@/data/projectData'

function statusColor(status) {
  switch(status) {
    case "Done":
      return "bg-green-100 text-green-700 dark:bg-green-900/70 dark:text-green-300"
    case "In Progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300"
    case "Todo":
      return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-200"
    default:
      return ""
  }
}

export default function ProjectList({ projects: projectsProp }) {
  const [showModal, setShowModal] = useState(false)
  const [projects, setProjects] = useState(
    projectsProp && projectsProp.length ? projectsProp : projectData
  )
  const COLORS = [
    "#4fd1ff", // Blue
    "#36d399", // Green
    "#fbbf24", // Yellow
    "#f87171", // Red
    "#818cf8", // Indigo
    "#f472b6", // Pink
  ]
  const [form, setForm] = useState({
    name: '',
    color: '#4fd1ff',
    status: 'Todo',
    tasks: 0
  })

  // Sample member, you can change to your team logic
  const defaultMember = {
    name: "Michael Scott",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }

  function handleAddProject(e) {
    e.preventDefault()
    if(!form.name) return
    const newProject = {
      id: Math.floor(Math.random()*10000000),
      name: form.name,
      color: form.color,
      status: form.status,
      tasks: Number(form.tasks) || 0,
      completed: 0,
      progress: 0,
      members: [defaultMember],
    }
    setProjects([newProject, ...projects])
    setForm({ name: '', color: '#4fd1ff', status: 'Todo', tasks: 0 })
    setShowModal(false)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8  transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 px-1">
       
        <button
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm font-semibold
          transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="text-base" />
          <span className="hidden md:inline">Add Project</span>
        </button>
      </div>
      {/* Projects grid */}
      <div className="flex flex-wrap gap-6 items-stretch">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`projects/${project.id}`}
            className="group flex-1 min-w-[260px] max-w-xs
              bg-white/90 dark:bg-[#181a24]/95  dark:text-zinc-400
              rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition
              border border-zinc-100 dark:border-zinc-800
              flex flex-col p-5
              outline-none focus:ring-2 focus:ring-blue-400"
            style={{boxShadow: `0 1px 8px 0 ${project.color}22`}}
            tabIndex={0}
            aria-label={`Go to project ${project.name}`}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
                style={{
                  background: project.color + "18"
                }}
              >
                <FaFolderOpen className="text-2xl" style={{color: project.color}} />
              </span>
              <div className="flex-1">
                <div className="font-bold text-base group-hover:text-blue-600 dark:group-hover:text-blue-300">{project.name}</div>
                <div className={`mt-1 px-2 py-0.5 rounded-full text-xs font-semibold inline-block ${statusColor(project.status)}`}>
                  {project.status}
                </div>
              </div>
              <button
                className="text-zinc-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition"
                onClick={e => { e.preventDefault(); }}
                tabIndex={-1}
                type="button"
                aria-label="More actions"
              >
                <BsThreeDots />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="text-xs text-zinc-500 dark:text-zinc-300">
                {project.completed}/{project.tasks} tasks
              </div>
              <div className="flex-1 h-2 mx-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-500 absolute left-0 top-0"
                  style={{
                    width: `${Math.round((project.progress ?? (project.completed / (project.tasks || 1))) * 100)}%`,
                    background: project.progress === 1
                      ? "#33e17a"
                      : `linear-gradient(90deg, ${project.color} 70%, #4fd1ff 100%)`,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between items-end mt-5">
              <div className="flex -space-x-3">
                {project.members.map((member, idx) => (
                  <img
                    key={idx}
                    src={member.avatar}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-[#23263a] bg-zinc-100 object-cover shadow"
                    title={member.name}
                    alt={member.name}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-medium">{project.tasks} tasks</span>
            </div>
          </Link>
        ))}
      </div>

      {/* MODAL ADD PROJECT */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 dark:bg-black/40 transition-all">
          <div className="bg-white dark:bg-[#23263a] rounded-lg shadow-2xl p-6 w-full max-w-md border border-zinc-200 dark:border-zinc-800 relative animate-fadein">
            <h3 className="text-xl font-bold mb-6 text-[#345] dark:text-white">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-5">
              <div>
                <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-200">Project Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#23263a] text-zinc-900 dark:text-zinc-100 px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  value={form.name}
                  onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-200">Color</label>
                  <div className="flex gap-2 mt-1">
                    {COLORS.map(c => (
                      <button
                        key={c}
                        type="button"
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ring-0
                          ${form.color === c
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-zinc-300 dark:border-zinc-700'}
                        `}
                        style={{ background: c }}
                        onClick={() => setForm(f => ({ ...f, color: c }))}
                        aria-label={c}
                      >
                        {form.color === c &&
                          <span className="w-3 h-3 rounded-full bg-white border-2 border-white shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-200">Status</label>
                  <select
                    className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#23263a] text-zinc-900 dark:text-zinc-100 px-2 py-2"
                    value={form.status}
                    onChange={e => setForm(f => ({...f, status: e.target.value}))}
                  >
                    <option>Todo</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 hover:dark:bg-zinc-700 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  disabled={!form.name}
                >
                  Add
                </button>
              </div>
            </form>
            {/* Close icon */}
            <button
              className="absolute top-3 right-4 text-zinc-400 hover:text-rose-500 transition text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              type="button"
            >×</button>
          </div>
        </div>
      )}
    </div>
  )
}
