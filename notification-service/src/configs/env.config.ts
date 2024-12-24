import "dotenv/config"
import { IEnv } from "@/interfaces"

const env: IEnv = {
  APP: {
    PORT: process.env.APP_PORT || 3000,
    HOSTNAME: process.env.APP_HOST || "",
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || "",
    PORT: process.env.REDIS_PORT || 6379,
    USERNAME: process.env.REDIS_USERNAME || "",
    PASSWORD: process.env.REDIS_PASSWORD || "",
  },
}

export default env
