'use client'
import React, {useState, useMemo} from 'react'
import clsx from 'clsx'

// Demo Data (replace with API)
const members = [
  { id: 1, name: "Hamid Nazari", avatar: 'https://randomuser.me/api/portraits/women/40.jpg', color: "#8acbff", initials: "HN", role: "Developer", },
  { id: 2, name: "Setareh Changizi", avatar: 'https://randomuser.me/api/portraits/women/40.jpg', color: "#facfd1", initials: "SC", role: "PM", },
  { id: 3, name: "Younes Rezaei", avatar: 'https://randomuser.me/api/portraits/women/40.jpg', color: "#c6edea", initials: "YR", role: "UI/UX", },
]
const tasks = [
  { id: 123, title: "Implement new project",    assignee: 1, status: "done",   due: "2025-08-04", prio: "A" },
  { id: 124, title: "Fix plugin bugs",          assignee: 1, status: "doing",  due: "2025-08-02", prio: "B" },
  { id: 125, title: "Prepare release docs",     assignee: 1, status: "todo",   due: "2025-08-07", prio: "C" },
  { id: 126, title: "Coordinate with marketing",assignee: 2, status: "done",   due: "2025-08-06", prio: "A" },
  { id: 127, title: "QA testing",               assignee: 2, status: "todo",   due: "2025-08-05", prio: "A" },
  { id: 128, title: "Update design system",     assignee: 3, status: "doing",  due: "2025-08-02", prio: "B" },
  { id: 129, title: "Research competitors",     assignee: 3, status: "todo",   due: "2025-08-06", prio: "C" },
]
// Status & priority color maps
const statusMap = {
  todo:  {label:'To do',      color:'bg-zinc-200 dark:bg-zinc-800', dot:'bg-zinc-400', text:'text-zinc-600', ring: 'ring-zinc-200'},
  doing: {label:'In progress',color:'bg-blue-100 dark:bg-blue-700', dot:'bg-blue-400', text:'text-blue-600', ring:'ring-blue-200'},
  done:  {label:'Done',       color:'bg-green-100 dark:bg-green-700', dot:'bg-green-500', text:'text-green-600', ring:'ring-green-200'},
}
const prioColor = {A:'bg-red-500',B:'bg-yellow-400',C:'bg-green-500'}

export default function MemberTaskPanelModern() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  // Sort members by # of completed tasks
  const sortedMembers = useMemo(() => {
    return [...members].sort((a,b)=> {
      const aDone = tasks.filter(t=>t.assignee===a.id && t.status==='done').length
      const bDone = tasks.filter(t=>t.assignee===b.id && t.status==='done').length
      return bDone-aDone
    });
  }, [members, tasks]);

  // Filter tasks by selection & search
  const visibleTasks = useMemo(()=>{
    const ts = tasks.filter(t=>selected==null ? false : t.assignee===selected)
    if(!search) return ts
    return ts.filter(
      t=>Object.values(t).some(x=>x && x.toString().toLowerCase().includes(search.toLowerCase()))
    )
  }, [selected, search])

  // Skeleton loader
  React.useEffect(()=>{
    setLoading(true)
    const x = setTimeout(()=>setLoading(false), 600)
    return ()=>clearTimeout(x)
  },[selected])

  return (
    <section className="w-full mx-auto py-10 px-3 font-['Vazirmatn','IRANSansX',sans-serif]">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-7 gap-2">
        <div>
          <h2 className="font-extrabold text-[1.7rem] md:text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">Team members & tasks</h2>
          <p className="text-zinc-400 dark:text-zinc-400 mt-1 text-sm">All your team members, their progress, and tasks at a glance.</p>
        </div>
        {selected &&
          <div className="flex gap-2 mt-2 md:mt-0 max-w-xs w-full">
            <input
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 font-medium text-sm transition focus:border-blue-400 focus:outline-none"
              placeholder="Search tasks..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
              dir="ltr"
            />
            <button className="rounded-xl px-3 py-2 text-xs bg-blue-100 dark:bg-blue-900 font-bold text-blue-700 dark:text-blue-100 hover:bg-blue-200">Filter</button>
          </div>
        }
      </header>


      <div className="flex flex-col md:flex-row gap-7">
      {/* Members sidebar */}
      <aside className="md:w-[290px] shrink-0">
        <div className="flex flex-col gap-2">
          {sortedMembers.map((m, i) => {
            const myTasks = tasks.filter(t=>t.assignee===m.id)
            const done    = myTasks.filter(t=>t.status === "done").length
            const prog    = myTasks.length?(done/myTasks.length*100):0
            return (
            <button key={m.id}
              onClick={()=>setSelected(m.id)}
              className={clsx(
                "relative w-full px-3 py-2 rounded-2xl flex items-center gap-3 border hover:shadow-md bg-white dark:bg-zinc-900 group transition active:scale-[0.98] hover:border-blue-400",
                selected===m.id ? "border-blue-400 shadow-lg ring-2 ring-blue-100 dark:ring-blue-900" : "border-zinc-100 dark:border-zinc-800"
              )}>
              {/* Avatar or initials */}
              {m.avatar ?
                <img src={m.avatar} className="w-11 h-11 rounded-full object-cover border-2" style={{borderColor: m.color}} alt={m.name}/>
                : <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-black border-2" style={{borderColor: m.color, background:'#fff4', color:'#396'}}>{m.initials}</div>
              }
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="font-bold text-zinc-800 dark:text-zinc-100 text-base truncate">
                  {m.name}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-300 mt-0.5">{m.role || 'Team member'}</span>
                <div className="w-full h-2 mt-2 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                  <div className="h-full rounded-md transition-all" style={{
                    width: `${prog||4}%`,
                    background: `linear-gradient(90deg,#2080f6 70%,#34c38f 100%)`
                  }}/>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-zinc-400">{myTasks.length} task</span>
                <span className="text-xs mt-1 font-bold text-green-500">{done} done</span>
              </div>
              {/* More actions */}
              <div className="opacity-0 group-hover:opacity-100 transition absolute top-4 left-4 text-zinc-400 dark:text-zinc-500 z-20">
                <button title="More"><span className="text-2xl">⋮</span></button>
              </div>
            </button>
          )})}
        </div>
      </aside>

      {/* Task list for the selected member */}
      <main className="flex-1 min-w-0">
        {!selected && (
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-100 dark:border-zinc-700 rounded-2xl min-h-[220px] flex flex-col justify-center items-center text-zinc-400 dark:text-zinc-600 font-bold text-lg">
            <span className="mt-16 mb-12 select-none">Select a member to see their tasks.</span>
          </div>
        )}
        {selected && (
          <div>
            {loading ?
              // Skeleton loading
              <div>
                {Array.from({length:3}).map((_,i)=>
                  <div key={i} className="flex items-center animate-pulse gap-3 mb-3 bg-white/60 dark:bg-zinc-900/60 rounded-xl px-4 py-4 border border-zinc-100 dark:border-zinc-800">
                    <div className="w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded"/>
                    <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded mx-1"/>
                    <div className="h-4 w-10 bg-zinc-100 dark:bg-zinc-800 rounded"/>
                  </div>
                )}
              </div>
              :
              visibleTasks.length===0
              ? <div className="py-16 text-center text-zinc-400 dark:text-zinc-600">No tasks found for this member.</div>
              : <div className="flex flex-col gap-2">
                  {visibleTasks.map(task=>{
                    const stm = statusMap[task.status]
                    return (
                      <div
                        key={task.id}
                        className={clsx(
                          "group flex items-center px-4 py-3 gap-12 rounded-xl border bg-white dark:bg-zinc-900 shadow-xs mb-1 transition-all cursor-pointer hover:border-blue-400 hover:ring-2 hover:ring-blue-100 dark:hover:ring-blue-900",
                          stm.ring
                        )}
                      >
                        <span className={clsx(stm.dot, "inline-block w-3 h-3 rounded-full ml-2")}/>
                        <span
                          className={clsx(
                            "font-medium text-[15px] flex-1 truncate text-left",
                            stm.text,
                            task.status==='done' && "line-through opacity-70"
                          )}
                        >
                          {task.title}
                        </span>
                        <span className={clsx("ml-2 text-xs font-bold px-2 py-0.5 rounded-full border", prioColor[task.prio],'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 shadow-sm')}>
                          P{task.prio}
                        </span>
                        <span className={clsx(
                          stm.color, "px-2 py-0.5 rounded-lg text-xs font-bold ml-2"
                        )}>
                          {stm.label}
                        </span>
                        <span className={clsx(
                          "ml-1 px-2 text-xs font-bold text-blue-500/80"
                        )}>
                          {task.due}
                        </span>
                        {/* Action buttons (hover only) */}
                        <span className="opacity-0 group-hover:opacity-100 transition ml-1 mr-1 flex gap-2 text-lg">
                          <button title="Edit" className="hover:text-blue-600"><span>📝</span></button>
                          <button title="Delete" className="hover:text-red-500"><span>🗑️</span></button>
                        </span>
                      </div>
                    )
                  })}
                </div>
            }
          </div>
        )}
      </main>
      </div>
    </section>
  )
}
