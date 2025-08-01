'use client'
import { usePathname } from 'next/navigation'
import { FaBell, FaMoon, FaSun } from 'react-icons/fa'
import TaskViewsBar from './taskviewbar'

const titles = {
  dashboard: 'Dashboard',
  projects:  'Projects',
  teams:     'Team',
  analytics: 'Analytics',
  premium:   'Premium',
}

export default function DashboardHeader({ isDark, onToggleDark }) {
  const pathname = usePathname();
  const tab = pathname.split('/')[1]
  const title = titles[tab] || 'Dashboard'

  const user = {
    name: "Michael Scott",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <header className="
      sticky top-0 z-30 w-full
      backdrop-blur bg-white/75 dark:bg-[#20233a]/75
      border-b border-zinc-100 dark:border-zinc-800
      flex flex-col gap-0 px-6 md:px-10 py-2 shadow-sm font-iransansx
    ">
      <div className="flex items-center justify-between">
        {/* Title changes based on route */}
        <div>
          <span className="text-2xl font-black tracking-tight text-[#23263a] dark:text-white select-none">
            {title}
          </span>
          <div className="text-xs text-zinc-400 dark:text-zinc-300 mt-0.5 font-normal">
            {today}
          </div>
        </div>
       
        <div className="flex items-center gap-2 md:gap-4">
          {/* TaskViewsBar: Only show e.g. in dashboard/projects/analytics if needed */}
          {/* <TaskViewsBar /> */}

          {/* Notifications Bell */}
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 group transition"
            title="Notifications"
          >
            <FaBell size={19} className="text-zinc-400 group-hover:text-indigo-500 transition" />
            {/* notif badge example, show if unread */}
            <span className="absolute top-1.5 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#20233a]"></span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
            aria-label="Toggle dark mode"
            onClick={onToggleDark}
          >
            {isDark
              ? <FaSun size={18} className="text-yellow-300" />
              : <FaMoon size={18} className="text-zinc-500" />}
          </button>

          {/* User Profile Avatar */}
          <div className="relative flex items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-indigo-100 dark:border-indigo-800 shadow-sm"
            />
            {/* Optional: Status dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-[#20233a]" />
          </div>
        </div>
      </div>
      {/* optional: <TaskViewsBar /> goes here */}
    </header>
  )
}
