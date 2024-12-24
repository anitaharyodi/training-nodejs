
import { SAuth } from "@/services"
import { CustomError, formatResponse } from "@/utils"
import { VLoginSchema, VRegisterSchema } from "@/validators"
import { VSchedulerSchema } from "@/validators/auth.validator"
import { Request, Response, NextFunction } from "express"

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VLoginSchema.validate(req.body)
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await SAuth.login(value)
    res.json(formatResponse(true, "Login Success", user))
  } catch (error) {
    next(error)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VRegisterSchema.validate(req.body)
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await SAuth.register(value)
    res.json(formatResponse(true, "Register Success", user))
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await SAuth.refreshToken(req.body)
    res.json(formatResponse(true, "Refresh Token Success", user))
  } catch (error) {
    next(error)
  }
}

const schedulers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VSchedulerSchema.validate(req.body)

    if (error) {
      throw new CustomError(400, error.message)
    }

    const user = await SAuth.scheduler(value.isStart)
    res.json(formatResponse(true, `Scheduler ${value.isStart ? "Start" : "Stop"}`, user))
  } catch (error) {
    next(error)
  }
}

const CAuth = {
  login,
  register,
  refreshToken,
  schedulers,
}

export default CAuth
