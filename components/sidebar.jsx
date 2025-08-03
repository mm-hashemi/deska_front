'use client'
import { usePathname } from 'next/navigation'
import {
  FaBell, FaUsers, FaChartLine, FaCrown, FaHome
} from 'react-icons/fa'
import { GoProjectRoadmap } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import Link from 'next/link'

const nav = [
  { icon: <FaHome size={19} />, label: 'Home', slug: 'dashboard' },
  { icon: <GoProjectRoadmap size={19} />, label: 'Projects', slug: 'projects' },
  { icon: <FaUsers size={19} />, label: 'Team', slug: 'teams' },
  { icon: <FaChartLine size={19} />, label: 'Analytics', slug: 'analytics' },
  { icon: <FaCrown size={19} />, label: 'Premium', slug: 'pricing' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className={`
        w-20 md:w-64
        flex flex-col min-h-screen
        py-6 px-2
        border-r border-zinc-100 dark:border-zinc-800
        bg-white/80 dark:bg-[#181a24]/85
        backdrop-blur-lg
        transition-colors duration-300
        shadow-none
      `}
      style={{
        fontFamily: 'IRANSansX, Vazirmatn, Arial, sans-serif',
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-10 mt-1">
        <img src="/assets/images/logo.png" alt="deska" className='w-28 drop-shadow-xs' />
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-1.5 md:gap-2 flex-1">
        {nav.map((n) => {
          const isActive =
            pathname.includes(`/${n.slug}`) || (pathname === '/dashboard' && n.slug === 'dashboard')
          return (
            <Link
              href={`/${n.slug}`}
              key={n.label}
              aria-current={isActive ? 'page' : undefined}
              className={`
                group flex items-center px-3 md:px-5 py-2 gap-3 rounded-xl
                font-medium text-[15px] transition-all duration-200
                ${
                  isActive
                    // Subtle gradient/glass highlight (not heavy color block)
                    ? "bg-gradient-to-r from-[#eaf6ff]/70 to-transparent dark:from-[#243953]/60 dark:to-transparent text-[#32B9FF]"
                    : "text-zinc-500 dark:text-zinc-300 hover:text-[#32B9FF] hover:bg-[#eaf6ff]/80 dark:hover:bg-[#243953]/45"
                }
              `}
              tabIndex={0}
            >
              <span className={`flex items-center justify-center
                ${isActive
                  ? "text-[#32B9FF] dark:text-[#32B9FF]"
                  : "text-zinc-400 dark:text-zinc-500 group-hover:text-[#32B9FF]"
                }
                transition-colors duration-200
              `}>
                {n.icon}
              </span>
              <span className="hidden md:inline whitespace-nowrap">{n.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="mt-7">
        <div className="border-t border-zinc-100 dark:border-zinc-800 mx-2 mb-2"/>
        <button
          className={`
            flex items-center gap-3 px-3 md:px-5 py-2 w-full rounded-xl
            text-[15px] font-medium text-zinc-400 dark:text-zinc-500
            hover:text-rose-500 hover:bg-rose-50/60 dark:hover:bg-rose-900/15
            transition-all duration-200
          `}
        >
          <FiLogOut className="text-lg" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  )
}
