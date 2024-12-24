
import { STask } from "@/services"
import { CustomError, formatResponse } from "@/utils"
import { VTaskCreateSchema, VTaskFindByProjectSchema, VTaskFindSchema, VTaskUpdateSchema } from "@/validators"
import { NextFunction, Request, Response } from "express"

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await STask.getAllTasks()
    res.json(formatResponse("T", "Success Get All Tasks", tasks))
  } catch (error) {
    next(error)
  }
}

const getDetailTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VTaskFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const task = await STask.findTaskById(value)
    res.json(formatResponse(true, "Success Get Project By Id", task))
  } catch (error) {
    next(error)
  }
}

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VTaskCreateSchema.validate(req.body)
    if (error) {
      throw new Error(error.message)
    }
    const task = await STask.createTask(value)
    res.json(formatResponse(true, "Success Create Task", task))
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    if (!id) {
      throw new CustomError(400, "Task ID is required")
    }

    const { error, value } = VTaskUpdateSchema.validate(req.body)
    if (error) {
      throw new CustomError(400, error.message)
    }

    const existingTask = await STask.findTaskById({ id })
    if (!existingTask) {
      throw new CustomError(404, "Task not found")
    }

    const updateData = { ...value, id }
    const updatedTask = await STask.updateTask(updateData)

    res.json(formatResponse(true, "Success Update Task", updatedTask))
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VTaskFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const task = await STask.deleteTask(value)
    res.json(formatResponse(true, "Success Delete Task", task))
  } catch (error) {
    next(error)
  }
}

const getTaskByProjectId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VTaskFindByProjectSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const task = await STask.getTaskByProjectId(value)
    res.json(formatResponse(true, "Success Get Task By Project Id", task))
  } catch (error) {
    next(error)
  }
}

const CTask = {
  getAllTasks,
  getDetailTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskByProjectId,
}

export default CTask
