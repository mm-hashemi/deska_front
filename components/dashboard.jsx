// ModernDashboard.jsx
import React, { useState } from "react";
import {
  FiBell,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
  FiMenu,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiClipboard
} from "react-icons/fi";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

const fontFa = "font-[Vazirmatn,YekanBakh,IRANSansX,sans-serif]";

const tasksData = [
  { title: "طراحی کامپوننت داشبورد اصلی", priority: "high", done: false },
  { title: "رفع باگ نمایش اعلان‌ها در موبایل", priority: "medium", done: true },
  { title: "جلسه هفتگی با تیم توسعه", priority: "low", done: false },
];
const myTasksToday = [
  { title: "تحویل نهایی پروژه مدیریت", priority: "high", done: false },
  { title: "بررسی گزارش باگ‌ها", priority: "medium", done: false },
];

const projectsProgress = {
  labels: ["انجام شده", "در حال پیشرفت", "در انتظار"],
  datasets: [
    {
      data: [12, 8, 3],
      backgroundColor: [
        "rgb(34 197 94)", // green
        "rgb(59 130 246)", // blue
        "rgb(253 186 116)", // amber
      ],
      borderWidth: 2,
    },
  ],
};

const teamMembers = [
  { name: "زهرا محمدی", avatar: "/avatars/za.jpg" },
  { name: "علی اکبری", avatar: "/avatars/ali.jpg" },
  { name: "فرزانه کریمی", avatar: "/avatars/far.jpg" },
  { name: "رضا سلطانی", avatar: "/avatars/reza.jpg" },
];

const recentActivity = [
  { icon: <FiCheckCircle />, text: "زهرا یک تسک جدید ایجاد کرد", time: "۲۰ دقیقه پیش" },
  { icon: <FiClipboard />, text: "علی پروژه را تحویل داد", time: "۱ ساعت پیش" },
  { icon: <FiAlertCircle />, text: "اخطار: تأخیر در جلسه", time: "امروز" },
];

const meetings = [
  { title: "جلسه استندآپ", time: "۱۰:۳۰ - ۱۱", location: "Google Meet" },
  { title: "پیگیری فنی پروژه", time: "۱۴:۰۰", location: "اتاق شماره ۱" },
];

const notifications = [
  "یادآوری: جلسه تا ۱۰ دقیقه آینده",
  "آپدیت ورژن جدید موفقیت‌آمیز بود",
  "تسک «بررسی دیزاین» به شما تخصیص داده شد",
];

const recentProjects = [
  { title: "داشبورد مدیریت", progress: 90, lead: "فرزانه" },
  { title: "سیستم احراز هویت", progress: 65, lead: "علی" },
  { title: "وبلاگ شرکت", progress: 40, lead: "زهرا" },
];

const priorities = {
  high: "bg-red-500",
  medium: "bg-amber-400",
  low: "bg-blue-400"
};
const prioritiesText = {
  high: "بالا", medium: "متوسط", low: "کم"
};

export default function ModernDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("fa");
  const dir = lang === "fa" ? "rtl" : "ltr";
  const t = lang === "fa"
    ? {
        dashboard: "داشبورد",
        tasks: "تسک‌ها", myTasks: "تسک‌های امروز من",
        projects: "پروژه‌ها", members: "اعضا",
        activity: "فعالیت اخیر", meetings: "جلسات",
        notifications: "اعلان‌ها", recentProjects: "پروژه‌های اخیر",
        progress: "آمار پیشرفت", alert: "نگران نباش! همه‌چیز تحت کنترل است.",
        settings: "تنظیمات", more: "بیشتر"
      }
    : {
        dashboard: "Dashboard", tasks: "Tasks", myTasks: "My Tasks Today",
        projects: "Projects", members: "Team Members",
        activity: "Recent Activity", meetings: "Meetings",
        notifications: "Notifications", recentProjects: "Recent Projects",
        progress: "Progress Overview", alert: "Don't worry! Everything is under control.",
        settings: "Settings", more: "More"
      };

  // Glass style for cards, persian font, modern shadows:
  const card =
    "relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 " +
    "p-4 md:p-6 mb-6 hover:shadow-2xl transition-all " + fontFa +
    " overflow-hidden";

  // For small glass floating cards (e.g., notifications)
  const smallCard =
    "bg-white/50 dark:bg-slate-800/70 rounded-xl px-3 py-2 shadow border border-white/15 font-medium " + fontFa;

  // Headline style (sticky, glassy bar)
  const headerBar =
    "sticky top-0 z-30 flex gap-3 items-center justify-between px-5 py-3 " +
    "bg-white/75 dark:bg-slate-900/90 backdrop-blur-md border-b border-white/20 shadow-md " +
    fontFa;

  // Layout grid
  const grid =
    "grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-9 gap-5 md:gap-6 mt-8 w-full";

  // Bg for app: glass effect + modern transition
  const appBg =
    "min-h-screen w-full px-1 pb-10 transition bg-gradient-to-tr from-blue-50 to-white dark:from-[#141627] dark:to-neutral-900";

  // Theme colors
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`${appBg} ${fontFa}`} dir={dir}>
      {/* HEADER */}
      <header className={headerBar}>
        <div className="flex gap-1 items-center">
          <FiMenu className="text-xl opacity-70" />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-400">{t.dashboard}</span>
        </div>
        <div className="flex gap-1.5 items-center">
          <button className="relative">
            <FiBell className="text-2xl" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-pink-400 border-2 border-white dark:border-slate-800"></span>
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FiSun className="text-xl text-yellow-300" /> : <FiMoon className="text-xl" />}
          </button>
          <select
            className="p-2 rounded-xl bg-transparent border-none focus:ring-2 focus:ring-blue-400 font-semibold"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="fa">FA</option>
            <option value="en">EN</option>
          </select>
          <div className="flex items-center gap-2 ml-1 px-2 py-0.5 bg-white/80 dark:bg-blue-950/60 rounded-xl shadow-sm">
            <img src="/avatars/za.jpg" alt="" className="w-7 h-7 rounded-full border border-blue-300 shadow-md" />
            <span className="whitespace-nowrap text-slate-900 dark:text-white text-sm">{lang === "fa" ? "زهرا محمدی" : "Zahra Mohammadi"}</span>
            <FiChevronDown className="opacity-60" />
          </div>
        </div>
      </header>
      {/* ALERT BANNER */}
      <div className="flex w-full justify-center py-1">
        <div className="flex items-center gap-2 px-5 py-3 bg-orange-200/60 dark:bg-orange-900/55 rounded-xl shadow-inner border border-orange-500/25 max-w-xl text-orange-900 dark:text-orange-200 font-semibold">
          <FiAlertCircle className="text-xl" />
          {t.alert}
        </div>
      </div>

      <main className={`${grid} w-full max-w-7xl mx-auto`}>

        {/* TASKS */}
        <section className={`${card} col-span-1 lg:col-span-2 xl:col-span-2`}>
          <h2 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <FiClipboard className="opacity-60" />
            {t.tasks}
            <span className="text-xs px-1 bg-blue-100 dark:bg-blue-950/40 rounded-lg ml-2">
              {tasksData.filter((t) => !t.done).length} باز
            </span>
          </h2>
          <ul>
            {tasksData.map((task, i) => (
              <li key={i} className="flex items-center gap-2.5 my-2">
                <input type="checkbox" checked={task.done} readOnly
                  className="accent-sky-500 w-5 h-5 rounded-full border border-slate-400"
                />
                <span className={`w-2 h-2 rounded-full mt-1 ${priorities[task.priority]}`} title={prioritiesText[task.priority]} />
                <span className={`text-base font-medium ${task.done ? "line-through opacity-60" : ""}`}>
                  {task.title}
                </span>
                <span className="text-xs text-slate-400 mx-1">{lang === "fa" ? `(اولویت ${prioritiesText[task.priority]})` : `(priority:${task.priority})`}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* MY TASKS TODAY */}
        <section className={`${card} col-span-1 lg:col-span-2 xl:col-span-2`}>
          <h2 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-400 flex items-center gap-2">
            <FiCheckCircle className="opacity-60" />
            {t.myTasks}
          </h2>
          <ul>
            {myTasksToday.map((task, i) => (
              <li key={i} className="flex items-center gap-2.5 my-2">
                <input type="checkbox" checked={task.done} readOnly
                  className="accent-green-500 w-5 h-5 rounded border border-slate-400"
                />
                <span className={`w-2 h-2 rounded-full mt-1 ${priorities[task.priority]}`} />
                <span className={`text-base font-medium ${task.done ? "line-through opacity-60" : ""}`}>
                  {task.title}
                </span>
                <span className="text-xs text-slate-400 mx-1">{lang === "fa" ? `(اولویت ${prioritiesText[task.priority]})` : `(priority:${task.priority})`}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* PROJECT PROGRESS (DOUGHNUT) */}
        <section className={`${card} col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col`}>
          <h2 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <FiTrendingUp className="opacity-60" /> {t.progress}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 flex-shrink-0">
              <Doughnut
                data={projectsProgress}
                options={{
                  plugins: { legend: { display: false } },
                  cutout: "75%", responsive: true,
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              {projectsProgress.labels.map((l, i) => (
                <div key={l} className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ background: projectsProgress.datasets[0].backgroundColor[i] }} />
                  <span className="text-base font-bold">{l}</span>
                  <span className="text-xs px-1 text-slate-600 dark:text-slate-300">{projectsProgress.datasets[0].data[i]} {lang === "fa" ? "پروژه" : "projects"}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM MEMBERS */}
        <section className={`${card} col-span-1 lg:col-span-2 xl:col-span-1 flex flex-col`}>
          <h2 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <FiUsers className="opacity-60" /> {t.members}
          </h2>
          <div className="flex mt-2 -space-x-5 rtl:space-x-reverse">
            {teamMembers.map((m, i) => (
              <img
                key={m.name} src={m.avatar}
                alt={m.name}
                className={`w-10 h-10 border-4 border-white dark:border-slate-900 rounded-full shadow-md
                  -ml-2 hover:z-10`}
                title={m.name}
              />
            ))}
            <button className={`${smallCard} ml-3`}><span className="text-lg">+</span> {t.more}</button>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className={`${card} col-span-1 lg:col-span-2 xl:col-span-2`}>
          <h2 className="text-lg font-semibold mb-2 text-pink-600 dark:text-pink-300 flex items-center gap-2">
            <FiCalendar className="opacity-60" /> {t.activity}
          </h2>
          <ul className="space-y-3 mt-2">
            {recentActivity.map((a, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-xl text-pink-400">{a.icon}</span>
                <span className="font-medium">{a.text}</span>
                <span className="text-xs text-slate-400 ml-2">{a.time}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* MEETINGS (NOTIFS) */}
        <section className={`${card} col-span-1 lg:col-span-2 xl:col-span-2`}>
          <h2 className="text-lg font-semibold mb-3 text-sky-700 dark:text-sky-300 flex items-center gap-2">
            <FiCalendar className="opacity-60" /> {t.meetings}
          </h2>
          <ul className="space-y-3 mt-2">
            {meetings.map((m, i) => (
              <li key={i} className="flex flex-col bg-sky-100/70 dark:bg-sky-950/50 rounded-xl p-2 shadow-sm mb-1">
                <span className="font-semibold">{m.title}</span>
                <span className="text-xs text-slate-500">{m.time} | {m.location}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* NOTIFICATIONS */}
        <section className={`${card} col-span-1 lg:col-span-2 xl:col-span-1`}>
          <h2 className="text-lg font-semibold mb-2 text-orange-600 dark:text-orange-300 flex items-center gap-2">
            <FiBell className="opacity-60" /> {t.notifications}
          </h2>
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <li key={i} className={smallCard}>
                {n}
              </li>
            ))}
          </ul>
        </section>

        {/* RECENT PROJECTS */}
        <section className={`${card} col-span-1 lg:col-span-6 xl:col-span-4`}>
          <h2 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <FiTrendingUp className="opacity-60" /> {t.recentProjects}
          </h2>
          <ul className="space-y-4">
            {recentProjects.map((prj, i) => (
              <li key={i} className="flex flex-col md:flex-row items-center justify-between gap-2 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl p-3 shadow-sm border border-blue-200/20">
                <span className="font-semibold text-base">{prj.title}</span>
                <span className="w-full md:w-1/3 h-3 rounded-lg bg-gray-200 dark:bg-slate-800 relative overflow-hidden mx-2 shrink-0">
                  <span
                    style={{ width: `${prj.progress}%` }}
                    className="absolute left-0 top-0 h-full rounded-lg
                      bg-gradient-to-r from-blue-500 to-green-400
                      dark:from-blue-400 dark:to-green-400 shadow-inner"
                  />
                </span>
                <span className="ml-3 text-sm text-slate-600 dark:text-slate-300">{prj.progress}%</span>
                <span className="text-xs whitespace-nowrap bg-green-200/60 dark:bg-green-950/30 rounded-lg px-2 py-1">{lang === "fa" ? `مسئول: ${prj.lead}` : `Lead: ${prj.lead}`}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
