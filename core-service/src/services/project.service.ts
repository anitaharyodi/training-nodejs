import { IProject } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError } from "@/utils"
import { sendProjectNotification } from "./kafka.service"

const getAllProjects = async () => {
  const projects = await prisma.project.findMany({
    include: {
      userProjects: true,
    },
  })

  return projects
}

const findById = async (data: Pick<IProject, "id">) => {
  const { id } = data
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      userProjects: {
        include: {
          user: true,
        },
      },
    },
  })
  if (!project) {
    throw new CustomError(404, "Project not found")
  }
  return project
}

const createProject = async (data: Omit<IProject, "id" | "createdAt" | "updatedAt">) => {
  const userExists = await prisma.user.findUnique({
    where: { id: data.ownerId },
  })

  if (!userExists) {
    throw new CustomError(404, "User with the given ownerId does not exist")
  }

  const project = await prisma.project.create({
    data: {
      ...data,
      description: data.description || "",
      userProjects: {
        create: {
          userId: data.ownerId,
        },
      },
    },
    include: {
      userProjects: true,
    },
  })

  await sendProjectNotification(project, "created")

  return project
}

const updateProject = async (data: Omit<IProject, "createdAt" | "updatedAt">) => {
  const project = await prisma.project.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      deadline: data.deadline
    },
  })

  return project
}

const deleteProject = async (data: Pick<IProject, "id">) => {
  const project = await prisma.project.delete({
    where: {
      id: data.id,
    },
  })
  return project
}

const addUserProject = async (data : { projectId: string, userId: string}) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: data.userId },
  })

  if (!existingUser) {
    throw new CustomError(404, "User not found");
  }

  const existingProject = await prisma.project.findUnique({
    where: { id: data.projectId },
  });

  if (!existingProject) {
    throw new CustomError(404, "Project not found");
  }

  const userProject = await prisma.userProject.create({
    data: {
      user: { connect: { 
        id: data.userId
      }},
      project: { connect: {
        id: data.projectId
      }}
    },
    include: {
      user: true,
      project: true
    }
  });

  return userProject;
};

const deleteUserProject = async (id: string) => {
  const userProject = await prisma.userProject.delete({
    where: {
      id
    }
  });
  return userProject;
};


const SProject = {
  getAllProjects,
  findById,
  createProject,
  updateProject,
  deleteProject,
  addUserProject,
  deleteUserProject
}

export default SProject
