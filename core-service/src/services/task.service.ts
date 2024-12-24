import { IProject, ITask } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError } from "@/utils"
import { sendTaskNotification } from "./kafka.service"

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany({
    include: {
      project: true,
    },
  })

  return tasks
}

const findTaskById = async (data: Pick<ITask, "id">) => {
  const { id } = data
  const tasks = await prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      project: {
        include: {
          userProjects: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })
  if (!tasks) {
    throw new CustomError(404, "Task not found")
  }
  return tasks
}

const createTask = async (data: Omit<ITask, "id" | "createdAt" | "updatedAt">) => {
  const { title, description, status, dueDate, projectId, assigneeId } = data

  const assigneeExists = await prisma.user.findUnique({
    where: { id: assigneeId },
  })

  if (!assigneeExists) {
    throw new CustomError(404, "Assignee with the given assigneeId does not exist")
  }

  const projectExists = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!projectExists) {
    throw new CustomError(404, "Project with the given projectId does not exist")
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      dueDate,
      projectId,
      assigneeId,
    },
  })

  await sendTaskNotification(task, "created")

  return task
}

const updateTask = async (data: Omit<ITask, "createdAt" | "updatedAt">) => {
  const task = await prisma.task.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
      projectId: data.projectId,
      assigneeId: data.assigneeId,
    },
  })

  return task
}

const deleteTask = async (data: Pick<ITask, "id">) => {
  const task = await prisma.task.delete({
    where: {
      id: data.id,
    },
  })
  return task
}

const getTaskByProjectId = async (data: Pick<IProject, "id">) => {
  const { id } = data
  const tasks = await prisma.task.findMany({
    where: {
      projectId: id,
    },
    include: {
      assignee: true
    }
  })
  return tasks
}

const STask = {
  getAllTasks,
  findTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskByProjectId,
}

export default STask
