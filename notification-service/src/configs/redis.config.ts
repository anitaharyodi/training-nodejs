import { createClient, RedisClientOptions } from "redis"
import env from "./env.config"

const redisConfig: RedisClientOptions = {
  socket: {
    host: env.REDIS.HOST,
    port: +env.REDIS.PORT,
  },
  username: env.REDIS.USERNAME,
  password: env.REDIS.PASSWORD,
}

const redisClient = createClient(redisConfig)

redisClient.on("error", (err) => console.error("[Redis] - Error,", err))

const connectToRedis = async (): Promise<void> => {
  try {
    await redisClient.connect()
    console.log("[Redis] - Connection Success")
  } catch (err) {
    console.error("[Redis] - Error Connection,", err)
  }
}

const Config = {
  redisClient,
  connectToRedis,
}

export default Config
