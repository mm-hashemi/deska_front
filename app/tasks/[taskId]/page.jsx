// app/tasks/[taskId]/page.jsx

import TaskDetails from "@/components/taskDetails";


// فرض دارای دیتای mock هستیم
const mockTasks = [
  { id: "1", title: "Design new login button", assignee: "Mark", status: "todo", due: "2025-08-10" },
  { id: "2", title: "API integration", assignee: "Neda", status: "inprogress", due: "2025-08-12" },
  { id: "3", title: "Fix comment bug", assignee: "Reza", status: "blocked", due: "2025-08-25" },
  { id: "4", title: "Final QA tests", assignee: "Zara", status: "done", due: "2025-08-08" },
];

export default function TaskDetailsPage({ params }) {
  // آیدی باید string باشد
  const task = mockTasks.find((t) => String(t.id) === params.taskId);

  return <TaskDetails task={task} />;
}
