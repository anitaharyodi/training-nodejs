import redisClient from "@/configs/redis.config"
import cron from "node-cron"

const schedule = (cronExpression: string, callback: () => void) => {
  cron.schedule(cronExpression, callback, {
    scheduled: true,
    timezone: "Asia/Jakarta",
  })
}

const deleteCache = async () => {
    redisClient.flushAll()
    console.log("[Redis] - Cache cleared")
}

export { schedule, deleteCache }
