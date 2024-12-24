export interface ITask {
  id: string
  title: string
  description: string
  status: string
  dueDate: Date
  projectId: string
  assigneeId: string
  createdAt: Date
  updatedAt: Date
}
