import prisma from "@/prisma/clients/core.client"
import { exclude } from "@/utils"

const getAllUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  return user
}

const getUserById = async (id: string) => {
  const users = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!users) {
    throw new Error("User not found")
  }

  return {
    user: exclude(users, ["password", "refreshToken", "createdAt", "updatedAt"]),
  }
}

const updateUserRole = async (id: string, role: "ADMIN" | "USER") => {
  if (!["ADMIN", "USER"].includes(role)) {
    throw new Error("Invalid role. Role must be 'ADMIN' or 'USER'.")
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role: role as "ADMIN" | "USER",
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return {
    user: exclude(user, ["password"]),
  }
}

const SUser = {
  getAllUser,
  getUserById,
  updateUserRole,
}

export default SUser
