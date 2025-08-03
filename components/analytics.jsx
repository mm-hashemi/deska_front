'use client'
import { FaClipboardList, FaUserFriends, FaProjectDiagram, FaUsers, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import clsx from 'clsx' // (optional, for cleaner classes)

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend)

const kpis = [
  {
    label: 'Projects',
    value: '16',
    trend: 'up',
    change: '+5%',
    icon: <FaProjectDiagram className="text-indigo-500 text-xl" />,
    color: 'from-indigo-100 to-indigo-400/30',
    badge: 'This Month',
  },
  {
    label: 'Tasks',
    value: '126',
    trend: 'down',
    change: '-2%',
    icon: <FaClipboardList className="text-green-500 text-xl" />,
    color: 'from-green-100 to-green-400/30',
    badge: 'Total',
  },
  {
    label: 'Teams',
    value: '6',
    trend: 'up',
    change: '+1',
    icon: <FaUserFriends className="text-orange-500 text-xl" />,
    color: 'from-orange-100 to-orange-400/30',
    badge: 'Active',
  },
  {
    label: 'Members',
    value: '37',
    trend: 'up',
    change: '+3',
    icon: <FaUsers className="text-blue-500 text-xl" />,
    color: 'from-blue-100 to-blue-400/30',
    badge: 'Total',
  },
]

// Mock chart data
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const lineData = {
  labels: months,
  datasets: [
    {
      label: 'Completed Tasks',
      data: [24, 35, 40, 29, 56, 48],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.15)',
      tension: 0.35,
      fill: true,
    },
  ],
}
const barData = {
  labels: months,
  datasets: [
    {
      label: 'Ongoing Tasks',
      data: [8, 12, 15, 22, 18, 20],
      backgroundColor: '#a5b4fc',
      borderRadius: 8,
      barThickness: 18,
    },
  ],
}
const pieData = {
  labels: months.slice(-3),
  datasets: [
    {
      label: 'Teams Distribution',
      data: [4, 5, 6],
      backgroundColor: ['#6366f1', '#fbbf24', '#34d399'],
    },
  ],
}
const doughnutData = {
  labels: months.slice(-3),
  datasets: [
    {
      label: 'Members Growth',
      data: [25, 30, 37],
      backgroundColor: ['#3b82f6', '#6366f1', '#f59e42'],
    },
  ],
}

const baseChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: { 
      grid: { display: false },
      ticks: { font: { family: 'Vazirmatn, sans-serif', size: 10 } } 
    },
    y: { 
      grid: { borderDash: [2,3], color: '#e0e7ef' },
      ticks: { font: { family: 'Vazirmatn, sans-serif', size: 10 } } 
    }
  }
}

const glassCard = "backdrop-blur-[5px] bg-white/75 dark:bg-[#181a24]/95 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition duration-300"

export default function AnalyticsNewUI() {
  return (
    <section className="flex flex-col gap-7 px-4 pt-6 pb-14 max-w-[1280px] mx-auto font-vazirmatn">

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-1">
       
        <div className="flex flex-row gap-3">
          <button className="px-4 py-1 rounded-xl text-sm bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold shadow hover:from-indigo-600 transition">
            Export
          </button>
          <button className="px-3.5 py-1 rounded-xl border text-sm text-indigo-600 border-indigo-200 hover:bg-indigo-50 font-semibold">
            Filter Month
          </button>
        </div>
      </div>
      
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div className={clsx("relative flex items-center gap-3 p-3.5 rounded-2xl", glassCard, "group transition", "overflow-hidden")} key={kpi.label}>
            <div className={clsx(
              "absolute top-1 right-2 text-xs px-2 py-0.5 rounded-2xl",
              kpi.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'
            )}>{kpi.badge}</div>
            <div className={clsx("rounded-full h-9 w-9 flex items-center justify-center bg-gradient-to-br", kpi.color, "shadow-inner")}>
              {kpi.icon}
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-1">
                {kpi.value}
                <span className={clsx(kpi.trend === 'up' ? 'text-green-500' : 'text-rose-500', "ml-1 text-xs flex items-center")}>
                  {kpi.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  {kpi.change}
                </span>
              </div>
              <div className="text-xs text-gray-500">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Main Line Chart (prominent) */}
        <div className={clsx("md:col-span-2 row-span-2 p-5 rounded-2xl", glassCard, "flex flex-col")}>
          <div className="text-base font-bold mb-3 text-indigo-700 dark:text-indigo-200">Completed Tasks by Month</div>
          <Line data={lineData} options={{ ...baseChartOptions, plugins: { legend: { display: false } } }} height={220} />
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">+18% growth</span>
            vs last quarter
          </div>
        </div>
        {/* Pie Chart */}
        <div className={clsx(glassCard, "p-5 rounded-2xl flex flex-col items-center justify-center")}>
          <div className="text-sm font-medium mb-2 text-orange-600">Teams Distribution</div>
          <Pie data={pieData} options={{
            plugins: { legend: { display: true, position: 'bottom', labels: { font: { family: 'Vazirmatn' }, boxWidth: 14, padding: 14 } } }
          }} height={130} />
        </div>
        {/* Doughnut Chart */}
        <div className={clsx(glassCard, "p-5 rounded-2xl flex flex-col items-center justify-center")}>
          <div className="text-sm font-medium mb-2 text-blue-600">Members Growth</div>
          <Doughnut data={doughnutData} options={{
            plugins: { legend: { display: true, position: 'bottom', labels: { font: { family: 'Vazirmatn' }, boxWidth: 14, padding: 14 } } }
          }} height={130} />
        </div>
        {/* Bar Chart (row full) */}
        <div className={clsx("md:col-span-2 p-5 rounded-2xl mt-2", glassCard)}>
          <div className="text-sm font-medium mb-2 text-green-600">Ongoing Tasks</div>
          <Bar data={barData} options={{
            ...baseChartOptions, plugins: { legend: { display: false } }
          }} height={120} />
        </div>
      </div>
    </section>
  )
}
