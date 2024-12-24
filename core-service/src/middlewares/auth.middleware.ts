import { env } from "@/configs"
import redisClient from "@/configs/redis.config"
import { CustomError, verifyToken } from "@/utils"
import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers?.authorization
  const missingAuthError = new CustomError(401, "Missing Auth Token")
  if (typeof bearerHeader === "undefined") {
    next(missingAuthError)
  }

  const token = bearerHeader?.split("Bearer ")?.[1] ?? ""
  
  if (!token || token === "") {
    next(missingAuthError)
  }

  try {
    const isTokenValid = verifyToken(token as string, env.APP.JWT_SECRET) as JwtPayload
    const isTokenExist = await redisClient.get(`auth:${isTokenValid.userId}:accessToken`)
    if (!isTokenExist) {
      throw new CustomError(403, "Invalid Token")
    }
    next()

  } catch (err) {
    next(err)
  }
}

export default authMiddleware