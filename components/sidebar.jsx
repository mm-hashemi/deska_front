'use client'
import { useRouter, usePathname } from 'next/navigation'
import { FaBell, FaUsers, FaChartLine, FaCrown, FaHome } from 'react-icons/fa'
import { GoProjectRoadmap } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import Link from 'next/link'

const nav = [
  { icon: <FaHome size={20} />, label: 'Home', slug: 'dashboard' },
  { icon: <GoProjectRoadmap size={20} />, label: 'Projects', slug: 'projects' },
  { icon: <FaUsers size={20} />, label: 'Team', slug: 'teams' },
  { icon: <FaChartLine size={20} />, label: 'Analytics', slug: 'analytics' },
  { icon: <FaCrown size={20} />, label: 'Premium', slug: 'pricing' },
]

export default function Sidebar({ selected }) {
  const router = useRouter()
  const pathname = usePathname()

  // پیدا کردن root base URL مثل /dashboard
  const base = pathname.split('/')[1] // فرض: /dashboard/team -> 'dashboard'

  return (
    <aside className="w-20 min-h-screen md:w-64 bg-white border-r border-zinc-200 flex flex-col py-4 px-2 shadow-sm">
      <div className="flex items-center gap-2 px-3 mb-8">
       <img src="/assets/images/logo.png" alt="deska" className='w-28'/>
      </div>
      <nav className="flex flex-col gap-2 md:gap-3 flex-1">
        {nav.map((n, i) => (
          <Link
            href={`/${base}/${n.slug}`}
            key={n.label}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/${n.slug}`)
            }}
            className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition group 
              ${i === selected
                ? 'bg-[#eff8fe] text-[#32B9FF]'
                : 'text-zinc-600 hover:text-[#32B9FF] hover:bg-[#eaf6ff]'
              }`}
          >
            <span>{n.icon}</span>
            <span className="hidden md:inline">{n.label}</span>
          </Link>
        ))}
      </nav>
      <button className="flex items-center gap-3 text-zinc-500 hover:text-rose-500 transition px-3 py-2 rounded-lg w-full mt-8">
        <FiLogOut className="text-xl" />
        <span className="hidden md:inline">Logout</span>
      </button>
    </aside>
  )
}
