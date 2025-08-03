'use client'
import { useTheme } from 'next-themes'
import { FaBell, FaTasks, FaFireAlt, FaRegStar, FaRegCircle, FaChevronRight } from 'react-icons/fa'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// --- [DATA] --- (use your same data as before)
const chartData = {
  labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  datasets: [
    {
      label: 'Completed Tasks',
      data: [11, 17, 14, 20, 18, 24, 19],
      fill: true,
      borderColor: '#32B9FF',
      backgroundColor: 'rgba(50,185,255,0.11)',
      pointBackgroundColor: '#32B9FF',
      tension: 0.4,
    },
    {
      label: 'New Issues',
      data: [6, 8, 5, 7, 8, 4, 7],
      fill: false,
      borderColor: '#A5B3CF',
      backgroundColor: '#A5B3CF',
      pointBackgroundColor: '#A5B3CF',
      borderDash: [4, 2],
      tension: 0.4,
    }
  ],
}
const chartOptions = {
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    x: { ticks: { color: "#b8bed6", font: { family: 'inherit' } }, grid: { color: '#eceefa', drawBorder: false } },
    y: { beginAtZero: true, ticks: { color: "#b8bed6", font: { family: 'inherit' } }, grid: { color: '#eceefa', drawBorder: false } }
  }
}

const notifications = [
  { type: "task", user: "Alex", text: "completed Task #23 - Client Presentation" },
  { type: "project", user: "Emily", text: "created new project: Team Portal" },
  { type: "mention", user: "Sara", text: "mentioned you in Daily Standup" },
  { type: "alert", user: "System", text: "You have 2 overdue tasks!" }
];

const teamMembers = [
  { name: 'Alex', role: 'Project Manager', img: 'https://randomuser.me/api/portraits/men/32.jpg', online: true },
  { name: 'Emily', role: 'Frontend Developer', img: 'https://randomuser.me/api/portraits/women/44.jpg', online: true },
  { name: 'Tom', role: 'UI Designer', img: 'https://randomuser.me/api/portraits/men/12.jpg', online: false },
  { name: 'Sara', role: 'QA Engineer', img: 'https://randomuser.me/api/portraits/women/68.jpg', online: true },
];

const projects = [
  {
    name: 'Website Revamp',
    status: 'In Progress',
    start: '2025-07-01',
    due: '2025-08-10',
    team: ['Alex', 'Sara', 'John'],
    statusColor: 'bg-blue-100/60 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200'
  },
  {
    name: 'Mobile App',
    status: 'Completed',
    start: '2025-05-05',
    due: '2025-07-23',
    team: ['Emily', 'Tom'],
    statusColor: 'bg-green-100/70 text-green-600 dark:bg-green-900/25 dark:text-green-300'
  },
  {
    name: 'Team Portal',
    status: 'Planning',
    start: '2025-07-29',
    due: '2025-08-25',
    team: ['Sara', 'Alex'],
    statusColor: 'bg-slate-100/80 text-slate-600 dark:bg-slate-900/20 dark:text-slate-200'
  },
  {
    name: 'Marketing Launch',
    status: 'Overdue',
    start: '2025-06-15',
    due: '2025-07-25',
    team: ['Anna', 'Eli'],
    statusColor: 'bg-amber-100/70 text-amber-600 dark:bg-amber-900/30 dark:text-amber-200'
  },
];

const activities = [
  { user: "You", description: "pushed new code to Mobile App", color: "#32B9FF" },
  { user: "Emily", description: "closed 3 issues", color: "#6C7BFC" },
  { user: "Tom", description: "updated dashboard UI", color: "#23a699" },
  { user: "Sara", description: "tested new login flow", color: "#CE3A6B" }
];

const myTasks = [
  {
    id: 1,
    title: "Design Meeting with Team",
    project: "Website Revamp",
    time: "09:00",
    status: "pending",
    priority: "high"
  },
  {
    id: 2,
    title: "Review PR #823",
    project: "Mobile App",
    time: "11:30",
    status: "done",
    priority: "medium"
  },
  {
    id: 3,
    title: "User Flow Update",
    project: "Team Portal",
    time: "14:15",
    status: "pending",
    priority: "low"
  },
  {
    id: 4,
    title: "Test Login Via SSO",
    project: "Team Portal",
    time: "16:00",
    status: "pending",
    priority: "high"
  },
];

export default function MinimalDashboard() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  // Minimal Glass & Soft UI Style
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7fa] via-[#eef0f5] to-[#e4e6ec] dark:from-[#191A20] dark:via-[#1d1e25] dark:to-[#232433] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-10">
        
        {/* Row 1: Stats + Chart */}
        <div className="grid md:grid-cols-7 gap-7 mb-8">
          {/* Stats Cards */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <div className="bg-white/90 dark:bg-[#20222f]/80 backdrop-blur rounded-2xl border border-gray-100 dark:border-zinc-800 p-5 flex items-center justify-between gap-5">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Active Tasks</div>
                <div className="text-2xl font-bold text-[#32b9ff] dark:text-[#7fd9ff]">14</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-500 font-medium">
                <FaTasks />+2
              </div>
            </div>
            <div className="bg-white/90 dark:bg-[#20222f]/80 backdrop-blur rounded-2xl border border-gray-100 dark:border-zinc-800 p-5 flex items-center justify-between gap-5">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Projects</div>
                <div className="text-2xl font-bold text-[#6C7BFC]">4</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                <FaFireAlt />1 overdue
              </div>
            </div>
            <div className="bg-white/90 dark:bg-[#20222f]/80 backdrop-blur rounded-2xl border border-gray-100 dark:border-zinc-800 p-5 flex items-center justify-between gap-5">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium whitespace-nowrap">Done This Week</div>
                <div className="text-2xl font-bold text-[#23a699] dark:text-[#6ee7b7]">35</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-500 font-medium">
                <FaTasks />+7
              </div>
            </div>
            <div className="bg-white/90 dark:bg-[#20222f]/80 backdrop-blur rounded-2xl border border-gray-100 dark:border-zinc-800 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700 dark:text-zinc-200">Notifications</span>
                <FaBell className="text-lg text-[#32b9ff]" />
              </div>
              <ul className="text-xs text-gray-500 dark:text-gray-400 flex flex-col gap-1 mt-2">
                {notifications.map((n, i) => (
                  <li key={i}>
                    <span className="font-bold" style={{ color: n.type === "alert" ? "#CE3A6B" : "#32b9ff" }}>{n.user}</span>
                    {" "}{n.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Chart */}
          <div className="md:col-span-5 flex flex-col rounded-2xl bg-white/90 dark:bg-[#20222f]/80 backdrop-blur border border-gray-100 dark:border-zinc-800 p-8 justify-between min-h-[290px]">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Progress Overview</div>
              <span className="text-xs text-gray-400 dark:text-gray-500">July 2025</span>
            </div>
            <div className="flex-1 flex items-center">
              <Line
                data={chartData}
                options={
                  isDark
                    ? {
                        ...chartOptions,
                        scales: {
                          x: { ...chartOptions.scales.x, ticks: { ...chartOptions.scales.x.ticks, color: "#9bb0db" }, grid: { ...chartOptions.scales.x.grid, color: "#23274d" }},
                          y: { ...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, color: "#9bb0db" }, grid: { ...chartOptions.scales.y.grid, color: "#23274d" }},
                        }
                      }
                    : chartOptions
                }
                height={100}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Team & Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
          {/* Team Members */}
          <div className="rounded-2xl bg-white/90 dark:bg-[#20222f]/80 backdrop-blur border border-gray-100 dark:border-zinc-800 p-6 flex flex-col gap-4">
            <div className="font-semibold text-gray-900 dark:text-zinc-100 mb-1">Team Members</div>
            <div className="flex flex-col gap-3 text-sm">
              {teamMembers.map((u) => (
                <div className="flex items-center gap-3" key={u.name}>
                  <span className={`w-2 h-2 rounded-full mt-0.5 ${u.online ? 'bg-green-400' : 'bg-gray-300'}`} />
                  <img src={u.img} className="w-8 h-8 rounded-full object-cover" alt={u.name} />
                  <span className="font-medium text-gray-800 dark:text-zinc-200">{u.name}</span>
                  <span className="text-xs text-gray-400 dark:text-zinc-400">{u.role}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Recent Activity */}
          <div className="rounded-2xl bg-white/90 dark:bg-[#20222f]/80 backdrop-blur border border-gray-100 dark:border-zinc-800 p-6">
            <div className="font-semibold text-gray-900 dark:text-zinc-100 mb-1">Recent Activity</div>
            <ul className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-2">
              {activities.map((ac, idx) => (
                <li key={idx}>
                  <span className="font-medium" style={{ color: ac.color }}>{ac.user}</span> {ac.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* My Tasks Today */}
        <div className="mb-10">
          <div className="rounded-2xl bg-white/90 dark:bg-[#20222f]/80 backdrop-blur border border-gray-100 dark:border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-zinc-100 flex items-center gap-2 text-base">
                <FaTasks className="text-[#32b9ff]" /> My Tasks Today
              </h3>
              <span className="text-xs text-gray-400 dark:text-gray-400">{myTasks.length} tasks</span>
            </div>
            <ul>
              {myTasks.map(task => (
                <li key={task.id} className="flex items-center justify-between py-3 px-2 border-b last:border-b-0 border-gray-100 dark:border-zinc-800 group">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-lg
                      ${task.priority === "high" ? "bg-rose-100 dark:bg-rose-900/50 text-rose-500 dark:text-rose-200" : 
                        task.priority === "medium" ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-200" : 
                        "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-200"}`}>
                      {task.priority === "high" && <FaFireAlt />}
                      {task.priority === "medium" && <FaRegStar />}
                      {task.priority === "low" && <FaRegCircle />}
                    </span>
                    <div className="min-w-0">
                      <div className={`truncate font-medium text-sm ${task.status === "done" ? "line-through text-gray-400 dark:text-zinc-500" : "text-gray-900 dark:text-zinc-100"}`}>{task.title}</div>
                      <div className="text-xs text-gray-400 dark:text-zinc-400">
                        in <span className="font-semibold text-[#6C7BFC] dark:text-[#b5bcff]">{task.project}</span> • {task.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold
                      ${task.status === "done"
                        ? "bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-200"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-200"
                      }`}>
                      {task.status}
                    </span>
                    <FaChevronRight className="text-gray-200 dark:text-zinc-500 group-hover:text-[#32b9ff] dark:group-hover:text-[#7fd9ff] transition" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Projects Table */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-zinc-100 text-base">Recent Projects</h3>
            <button className="bg-gradient-to-r from-[#32B9FF]/80 to-[#6C7BFC]/80 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-none hover:from-[#32b9ff] hover:to-[#756aff] transition">
              + New Project
            </button>
          </div>
          <div className="bg-white/90 dark:bg-[#20222f]/80 backdrop-blur border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 dark:text-gray-500 text-xs">
                  <th className="py-2 px-3 font-medium">Project</th>
                  <th className="py-2 px-3 font-medium">Status</th>
                  <th className="py-2 px-3 font-medium">Start</th>
                  <th className="py-2 px-3 font-medium">Due</th>
                  <th className="py-2 px-3 font-medium">Team</th>
                  <th className="py-2 px-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((prj) => (
                  <tr className="border-t border-gray-100 dark:border-zinc-800 hover:bg-[#f6fafd] dark:hover:bg-[#23274d]/40 transition" key={prj.name}>
                    <td className="py-2 px-3 font-medium text-sm">{prj.name}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prj.statusColor}`}>
                        {prj.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-xs">{prj.start}</td>
                    <td className="py-2 px-3 text-xs">{prj.due}</td>
                    <td className="py-2 px-3 flex gap-1">
                      {prj.team.map(person =>
                        <span key={person} className="bg-[#eaf6ff] dark:bg-[#1a4860]/30 text-[#32b9ff] dark:text-[#7fd9ff] font-medium px-2 py-0.5 rounded mr-1 text-xs">{person}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-[#32B9FF] dark:text-[#7fd9ff] hover:underline text-xs font-semibold">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-12 py-6 text-xs text-gray-400 dark:text-zinc-600 text-center">
          &copy; 2025 Deska. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
