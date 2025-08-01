'use client'
import TaskCalendar from '@/components/calander'
import TaskGantt from '@/components/taskGantt'
import ProjectKanbanBoard from '@/components/projects'
import MemberTaskList from '@/components/members'
import { useTaskView } from '@/context/TaskViewContext'
import TaskList from '@/components/TasksList'



export default function Page() {
  const { activeView } = useTaskView()
  
  return (
    <div className='mx-10 py-8'>
       {activeView === 'kanban' &&  <ProjectKanbanBoard />}
      {activeView === 'calendar' && <TaskCalendar />}
      {activeView === 'gantt' && <TaskGantt />}
      {activeView === 'members' && <MemberTaskList/>}
      {activeView === 'tasks' && <TaskList/>}

    </div>
  )
}

