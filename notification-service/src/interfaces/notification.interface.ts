export interface INotification {
  id?: string
  message: string
  type: string
  userId: string
  isRead: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface INotificationRequestPayload {
    userId: string
    projectName?: string
    taskName?: string
    action: string
}
