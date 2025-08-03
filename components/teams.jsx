'use client'
import { FaUsers, FaFolder } from 'react-icons/fa'

// Dummy data, you should replace with API/data fetch
const teams = [
  {
    id: '1',
    name: 'Front-End Wizards',
    description: 'UI/UX پرومسترها با عشق React و Tailwind.',
    members: [
      { name: 'Sara', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
      { name: 'Hamed', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { name: 'Nima', avatar: 'https://randomuser.me/api/portraits/men/37.jpg' },
    ],
    projects: 4
  },
  {
    id: '2',
    name: 'Backend Boomers',
    description: 'NodeJS . Python . SQL . عادت دارند backend را stable بسازند!',
    members: [
      { name: 'Ali', avatar: 'https://randomuser.me/api/portraits/men/40.jpg' },
      { name: 'Shirin', avatar: 'https://randomuser.me/api/portraits/women/31.jpg' },
    ],
    projects: 3
  },
  {
    id: '3',
    name: 'QA Ninjas',
    description: 'تست خودکار و دستی پروژه‌ها، زیر نظر Maryam.',
    members: [
      { name: 'Maryam', avatar: 'https://randomuser.me/api/portraits/women/27.jpg' },
      { name: 'Arash', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
    ],
    projects: 2
  },
]

function TeamCard({ team }) {
  return (
    <div className="
      bg-white dark:bg-[#181a24]/95  border border-zinc-100 dark:border-zinc-700 
      rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-xl transition
      font-iransansx
    ">
      <div className="flex items-center gap-3 mb-2">
        <FaUsers className="text-[#6795fc] text-2xl" />
        <span className="font-bold text-lg dark:text-zinc-200">{team.name}</span>
      </div>
      <p className="text-zinc-400 mb-2 dark:text-zinc-500 min-h-[2rem]">{team.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.members.map((m, idx) => (
            <img
              key={m.name}
              src={m.avatar}
              alt={m.name}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-[#23263a] shadow"
              style={{zIndex: 10-idx}}
              title={m.name}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-500 font-medium">
          <FaFolder className="text-blue-400 text-base" />
          {team.projects} پروژه
        </div>
      </div>
    </div>
  )
}

export default function TeamsPage() {
  return (
    <section className="flex flex-col gap-6 mx-12 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {teams.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </section>
  )
}
