'use client'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { FaBell } from 'react-icons/fa'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import TaskViewsBar from './taskviewbar'

const titles = { dashboard: 'Dashboard', projects:  'Projects', teams: 'Team', analytics: 'Analytics', premium: 'Premium', }

export default function DashboardHeader() {
  const pathname = usePathname();
  const tab = pathname.split('/')[1]
  const title = titles[tab] || 'Dashboard'

  const { theme, setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark'
  // theme: "light" | "dark" | "system"
  // resolvedTheme: "light" | "dark" → ترجیح کاربر یا سیستم

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
      backdrop-blur bg-white/75 dark:bg-[#181a24]/95 
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
          {/* Notifications Bell */}
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 group transition"
            title="Notifications"
          >
            <FaBell size={19} className="text-zinc-400 group-hover:text-indigo-500 transition" />
            <span className="absolute top-1.5 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#20233a]"></span>
          </button>

          {/* Dark Mode Toggle */}
         <button
      type="button"
      className="focus:outline-none hover:bg-indigo-50 hover:text-indigo-500 p-2 rounded-full dark:hover:bg-indigo-900"
      aria-label={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark
        ? <HiOutlineSun size={23} className="text-zinc-400 hover:text-indigo-500" />   // فقط سفید
        : <HiOutlineMoon size={23} className="text-zinc-400 hover:text-indigo-500" />} 
    </button>
          {/* User Profile Avatar */}
          <div className="relative flex items-center">
            <img src={user.avatar} alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-indigo-100 dark:border-indigo-800 shadow-sm" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-[#20233a]" />
          </div>
        </div>
      </div>
      {/* optional: <TaskViewsBar /> */}
    </header>
  )
}
