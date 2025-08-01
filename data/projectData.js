// /app/data/projectData.js

export const people = [
  { name: "Zahra", img: "/avatars/za.jpg" },
  { name: "Ali", img: "/avatars/ali.jpg" },
  { name: "Farzaneh", img: "/avatars/far.jpg" },
  { name: "Reza", img: "/avatars/reza.jpg" }
];

export const projects = [
  {
    id: '12',
    name: 'Redesign Website',
    description: 'UI redesign of main site',
    members: [people[0], people[1], people[2]],
    kanban: {
      columns: [
        {
          id: 'todo',
          name: 'To Do',
          color: 'from-[#C8D3F9] to-[#DEE7FF]',
          tasks: [
            {
              id: 't1',
              content: 'Design wireframes for admin view',
              lead: people[0],
              date: "2025-07-31",
              status: "To Do"
            }
          ]
        },
        {
          id: 'inprogress',
          name: 'In Progress',
          color: 'from-[#E0EEF7] to-[#D5FBFF]',
          tasks: [
            {
              id: 't2',
              content: 'Refactor dashboard logic',
              lead: people[1],
              date: "2025-08-01",
              status: "In Progress"
            }
          ]
        },
        {
          id: 'done',
          name: 'Done',
          color: 'from-[#C2FFD3] to-[#D0FFE1]',
          tasks: [
            {
              id: 't3',
              content: 'Sketch the landing page',
              lead: people[2],
              date: "2025-07-25",
              status: "Done"
            }
          ]
        }
      ]
    }
  },
  {
    id: '15',
    name: 'Infra Migration',
    description: 'Migrate infrastructure',
    members: [people[3]],
    kanban: {
      columns: [
        {
          id: 'todo',
          name: 'To Do',
          color: 'from-[#C8D3F9] to-[#DEE7FF]',
          tasks: []
        },
        {
          id: 'inprogress',
          name: 'In Progress',
          color: 'from-[#E0EEF7] to-[#D5FBFF]',
          tasks: []
        },
        {
          id: 'done',
          name: 'Done',
          color: 'from-[#C2FFD3] to-[#D0FFE1]',
          tasks: [
            {
              id: 't4',
              content: 'Prepare infra checklist',
              lead: people[3],
              date: "2025-07-26",
              status: "Done"
            }
          ]
        }
      ]
    }
  }
  // پروژه‌های بیشتر...
]
