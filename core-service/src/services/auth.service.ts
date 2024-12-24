import { env } from "@/configs"
import redisClient from "@/configs/redis.config"
import { IUser } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError, exclude, generateToken, verifyToken } from "@/utils"
import bcrypt from "bcrypt"
import { JwtPayload } from "jsonwebtoken"
import cron from 'node-cron'

const login = async (data: Pick<IUser, "email" | "password">) => {
  const { email, password } = data

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      role: true,
      password: true,
    },
  })

  if (!user) {
    throw new CustomError(400, "User not found")
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new CustomError(400, "Email/Password incorrect")
  }

  const accessToken = generateToken("token", user.id)
  const refreshToken = generateToken("refreshToken", user.id)

  await redisClient.set(`auth:${user.id}:refreshToken`, refreshToken, {
    EX: 7 * 24 * 60 * 60
  })

  await redisClient.set(`auth:${user.id}:accessToken`, accessToken, {
    EX: 15 * 60
  })

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      refreshToken
    }
  })

  return {
    user: exclude(user, ["password"]),
    accessToken,
    refreshToken
  }
}

const register = async (data: Pick<IUser, "email" | "name" | "password">) => {
  const { email, name, password } = data

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password : encryptedPassword
    }
  })

  return {
    user : exclude(user, ["password"])
  }
}

const refreshToken = async (data: Pick<IUser, "refreshToken">) => {
  const { refreshToken } = data
  // const user = await prisma.user.findFirst({
  //   where: {
  //     refreshToken: token
  //   }
  // })

  // if (!user) {
  //   throw new CustomError(400, "User not found")
  // }

  if(!refreshToken) {
    throw new CustomError(400, "User not found")
  }

  const decodedToken = verifyToken(refreshToken, env.APP.JWT_REFRESH_SECRET) as JwtPayload
  
  const storedRefreshToken = await redisClient.get(`auth:${decodedToken.userId}:refreshToken`)

  if(!storedRefreshToken || storedRefreshToken !== refreshToken) {
    throw new CustomError(401, "Invalid refresh token")
  }

  const accessToken = generateToken("token", decodedToken.userId)

  return {
    accessToken
  }
}

const job = cron.schedule('*/5 * * * * *', () => {
  console.log('[Scheduler] - Running every 5 seconds...')
}, {
  scheduled : false
}
)

const scheduler = async (isStart: boolean) => {
  if(isStart) {
    job.start()
  } else {
    job.stop()
  }
}

const SAuth = {
  login,
  register,
  refreshToken,
  scheduler
}

export default SAuth
