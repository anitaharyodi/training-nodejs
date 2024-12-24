export interface IEnv {
  APP: {
    PORT: string | number
    HOSTNAME: string
  }
  REDIS: {
    HOST: string
    PORT: string | number
    USERNAME: string
    PASSWORD: string
  }
}
