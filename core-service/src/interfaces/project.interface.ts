export interface IProject {
  id: string
  title: string
  description: string | null
  status: string
  deadline: Date
  createdAt?: Date
  updatedAt?: Date
  ownerId: string
}
