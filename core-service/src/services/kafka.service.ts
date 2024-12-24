import { producer, TOPICS } from "@/configs/kafka.config"
import { IProject, ITask } from "@/interfaces"
import { UserProject } from "@/prisma/generated/core"
import { CustomError } from "@/utils"

type ProjectAction = "created" | "updated" | "deleted"
type TaskAction = "created" | "updated" | "deleted"

export const sendProjectNotification = async (
  project: IProject & { userProjects: UserProject[] },
  action: ProjectAction,
) => {
  try {
    const notifications = project.userProjects.map((member) => ({
      topic: TOPICS.PROJECT_CHANGES,
      messages: [
        {
          value: JSON.stringify({
            projectId: project.id,
            action: action,
            projectName: project.title,
            userId: member.userId,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    }))

    await Promise.all(notifications.map((notification) => producer.send(notification)))
  } catch (error: any) {
    throw new CustomError(500, error.message)
  }
}

export const sendTaskNotification = async (task: ITask, action: TaskAction) => {
  try {
    const notifications = {
      topic: TOPICS.TASK_CHANGES,
      messages: [
        {
          value: JSON.stringify({
            taskId: task.id,
            action: action,
            taskName: task.title,
            userId: task.assigneeId,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    }

    await producer.send(notifications)
  } catch (error: any) {
    throw new CustomError(500, error.message)
  }
}
