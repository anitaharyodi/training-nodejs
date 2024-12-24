
import { SUser } from "@/services"
import { formatResponse } from "@/utils"
import { NextFunction, Request, Response } from "express"

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await SUser.getAllUser()
    res.json(formatResponse(true, "Get All User Success", user))
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const user = await SUser.getUserById(id)
    res.json(formatResponse(true, "Get User By Id Success", user))
  } catch (error) {
    next(error)
  }
}

const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.params

    const user = await SUser.updateUserRole(id, role as "ADMIN" | "USER")
    res.json(formatResponse(true, "Update User Role Success", user))
  } catch (error) {
    next(error)
  }
}

const CUser = {
  getAllUser,
  getUserById,
  updateUserRole
}

export default CUser
