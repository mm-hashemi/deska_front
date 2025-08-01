'use client'
import { FaBell, FaUsers, FaChartLine, FaCrown, FaHome, FaCheckCircle, FaRegCircle, FaFireAlt, FaChevronRight, FaRegStar,FaTasks } from 'react-icons/fa'

// Chart.js integration
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Navigation

// Chart Data
const chartData = {
  labels: [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  ],
  datasets: [
    {
      label: 'Completed Tasks',
      data: [11, 17, 14, 20, 18, 24, 19],
      fill: true,
      borderColor: '#32B9FF',
      backgroundColor: 'rgba(50,185,255,0.13)',
      pointBackgroundColor: '#32B9FF',
      tension: 0.4,
    },
    {
      label: 'New Issues',
      data: [6, 8, 5, 7, 8, 4, 7],
      fill: false,
      borderColor: '#CE3A6B',
      backgroundColor: '#CE3A6B',
      pointBackgroundColor: '#CE3A6B',
      borderDash: [5, 5],
      tension: 0.4,
    }
  ],
}
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'top', labels: { font: { family: 'inherit' } } },
    title: { display: false }
  },
  scales: {
    x: { ticks: { color: "#7c8cba", font: { family: 'inherit' } }, grid: { color: '#ecf1f9', drawBorder: false } },
    y: { beginAtZero: true, ticks: { color: "#7c8cba", font: { family: 'inherit' } }, grid: { color: '#ecf1f9', drawBorder: false } }
  }
}

// All sample data
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

const activities = [
  { user: "You", description: "pushed new code to Mobile App", color: "#32B9FF" },
  { user: "Emily", description: "closed 3 issues", color: "#6C7BFC" },
  { user: "Tom", description: "updated dashboard UI", color: "#23a699" },
  { user: "Sara", description: "tested new login flow", color: "#CE3A6B" }
];

const projects = [
  {
    name: 'Website Revamp',
    status: 'In Progress',
    start: '2025-07-01',
    due: '2025-08-10',
    team: ['Alex', 'Sara', 'John'],
    statusColor: 'bg-blue-100 text-blue-600'
  },
  {
    name: 'Mobile App',
    status: 'Completed',
    start: '2025-05-05',
    due: '2025-07-23',
    team: ['Emily', 'Tom'],
    statusColor: 'bg-green-100 text-green-600'
  },
  {
    name: 'Team Portal',
    status: 'Planning',
    start: '2025-07-29',
    due: '2025-08-25',
    team: ['Sara', 'Alex'],
    statusColor: 'bg-gray-100 text-gray-700'
  },
  {
    name: 'Marketing Launch',
    status: 'Overdue',
    start: '2025-06-15',
    due: '2025-07-25',
    team: ['Anna', 'Eli'],
    statusColor: 'bg-amber-100 text-amber-600'
  },
];

// "My Tasks Today" data
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
]

export default function ComplexDashboard() {
  return (
    <div className="min-h-screen bg-[#f7fafd] text-[#23263a] font-sans antialiased">
      
   

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
      

        {/* Widgets & Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-6 gap-7 px-6 py-8 w-full">
          {/* Stats Cards */}
          <div className="col-span-2 grid gap-5">
            <div className="flex gap-5">
              <div className="bg-white px-5 py-6 rounded-2xl shadow-sm flex-1 border border-zinc-100 flex flex-col justify-between hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-500">Active Tasks</span>
                  <span className="text-[#32b9ff] bg-[#eaf6ff] px-2 py-1 rounded-full text-sm font-bold">14</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-500 font-semibold">
                  <FaCheckCircle /> +2 today
                </div>
              </div>
              <div className="bg-white px-5 py-6 rounded-2xl shadow-sm flex-1 border border-zinc-100 flex flex-col justify-between hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-500">Projects</span>
                  <span className="text-[#6C7BFC] bg-[#f0f0fd] px-2 py-1 rounded-full text-sm font-bold">4</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-500 font-semibold">
                  <FaFireAlt /> 1 overdue
                </div>
              </div>
            </div>
            <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-500">Done This Week</span>
                <span className="text-[#23a699] bg-[#e1f7f4] px-2 py-1 rounded-full text-sm font-bold">35</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-500 font-semibold">
                <FaTasks /> +7 this week
              </div>
            </div>
            <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-zinc-700">Notifications</span>
                <FaBell className="text-[#32b9ff]" />
              </div>
              <ul className="text-xs space-y-1 mt-2">
                {notifications.map((n, i) => (
                  <li key={i}>
                    <span className="font-bold" style={{ color: n.type === "alert" ? "#CE3A6B" : "#32b9ff" }}>{n.user}</span>
                    {" "}{n.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Chart Area */}
          <div className="col-span-4 grid gap-5">
            <div className="bg-white rounded-2xl border border-zinc-100 px-8 py-8 shadow-sm hover:shadow-lg transition min-h-[208px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-bold">Progress Overview</div>
                <div className="text-xs text-zinc-400">July 2025</div>
              </div>
              <div className="flex-1 flex items-center justify-center py-2 min-h-[170px] h-[220px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
            {/* Team & Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm hover:shadow-lg transition relative">
                <div className="font-bold mb-3">Team Members</div>
                <div className="flex flex-col gap-3 text-sm">
                  {teamMembers.map((u, idx) => (
                    <div className="flex items-center gap-3" key={u.name}>
                      <span
                        className={`w-3 h-3 rounded-full ${u.online ? 'bg-green-400 ring-2 ring-green-100' : 'bg-zinc-300'} mr-1`}
                        title={u.online ? "Online" : "Offline"}
                      />
                      <img src={u.img} className="w-8 h-8 rounded-full object-cover" alt={u.name} />
                      <span className="font-semibold text-[#23263a]">{u.name}</span>
                      <span className="text-xs text-zinc-400 ml-1">{u.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm hover:shadow-lg transition">
                <div className="font-bold mb-3">Recent Activity</div>
                <ul className="text-sm space-y-2">
                  {activities.map((ac, idx) => (
                    <li key={idx}>
                      <span className="font-semibold" style={{ color: ac.color }}>{ac.user}</span> {ac.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* My Tasks Today */}
        <section className="px-6 pb-6">
          <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><FaTasks className="text-[#32b9ff]" /> My Tasks Today</h3>
              <span className="text-sm text-zinc-500">{myTasks.length} tasks</span>
            </div>
            <ul>
              {myTasks.map(task => (
                <li key={task.id} className="flex items-center justify-between py-3 px-2 border-b last:border-b-0 border-zinc-100 group">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${task.priority === "high" ? "bg-rose-100 text-rose-500" : task.priority === "medium" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}>
                      {task.priority === "high" && <FaFireAlt />}
                      {task.priority === "medium" && <FaRegStar />}
                      {task.priority === "low" && <FaRegCircle />}
                    </span>
                    <div className="min-w-0">
                      <div className={`truncate font-semibold ${task.status === "done" ? "line-through text-zinc-400" : ""}`}>{task.title}</div>
                      <div className="text-xs text-zinc-400">
                        in <span className="font-bold text-[#6C7BFC]">{task.project}</span> • {task.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${task.status === "done" ? "bg-green-100 text-green-500" : "bg-zinc-100 text-zinc-500"}`}>
                      {task.status}
                    </span>
                    <FaChevronRight className="text-zinc-300 group-hover:text-[#32b9ff] transition" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        {/* Recent Projects Table */}
        <section className="px-6 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Projects</h3>
            <button className="bg-gradient-to-r from-[#32B9FF] to-[#6C7BFC] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:from-[#2585cb] hover:to-[#756aff] transition">
              + New Project
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-zinc-100 p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-zinc-400 text-sm">
                  <th className="py-2 px-3 font-medium">Project</th>
                  <th className="py-2 px-3 font-medium">Status</th>
                  <th className="py-2 px-3 font-medium">Start Date</th>
                  <th className="py-2 px-3 font-medium">Due Date</th>
                  <th className="py-2 px-3 font-medium">Team</th>
                  <th className="py-2 px-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((prj, idx) => (
                  <tr className="border-t border-zinc-100 hover:bg-[#f6fafd] transition" key={prj.name}>
                    <td className="py-2 px-3 font-medium">{prj.name}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${prj.statusColor}`}>
                        {prj.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">{prj.start}</td>
                    <td className="py-2 px-3">{prj.due}</td>
                    <td className="py-2 px-3 flex gap-1">
                      {prj.team.map(person =>
                        <span key={person} className="bg-[#eaf6ff] text-[#32b9ff] font-bold px-2 py-0.5 rounded mr-1 text-xs">{person}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-[#32B9FF] hover:underline text-sm font-semibold">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-auto py-6 px-6 border-t border-zinc-100 text-sm text-zinc-500 bg-white shadow-inner">
          &copy; 2025 Deska. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

// Sidebar "Projects" uses GoProjectRoadmap icon for SaaS-like feel.
