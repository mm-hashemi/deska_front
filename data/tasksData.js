// app/data/tasksData.js
export const tasksData = [
  {
    id: "1",
    title: "Design new login button",
    description: "Implement a new stylish login button for the landing page.",
    assignee: "Mark",
    status: "todo",
    due: "2025-08-10",
    tags: ["UI", "Frontend"],
    color: "#60A5FA",
    dependencies: ["2"],
    attachments: [
      { id: "att1", fileName: "design.png", url: "/uploads/design.png" }
    ]
  },
  {
    id: "2",
    title: "API: Auth endpoint",
    description: "Secure authentication API in Node.js.",
    assignee: "Sarah",
    status: "inprogress",
    due: "2025-08-20",
    tags: ["API", "Backend"],
    color: "#A78BFA",
    dependencies: [],
    attachments: []
  }
  // اضافه کن...
];

// این فانکشن برای سادگی فقط mock است (در پروژه واقعی باید با API باشد)
export function updateTask(taskId, updates) {
  const idx = tasksData.findIndex(t => t.id === taskId);
  if (idx !== -1) {
    tasksData[idx] = { ...tasksData[idx], ...updates };
  }
}
