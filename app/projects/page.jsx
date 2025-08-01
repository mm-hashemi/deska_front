'use client'
import TaskCalendar from '@/components/calander'
import MemberTaskList from '@/components/members'
import ProjectList from '@/components/ProjectList'
import Projects from '@/components/projects'
import TaskGantt from '@/components/taskGantt'
import React from 'react'

export default function page() {
 

  return (
    <div className='mx-10'>
    <ProjectList/>
    </div>
  )
}
