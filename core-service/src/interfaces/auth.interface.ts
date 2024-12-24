export interface IUser {
  id: string
  email: string
  name: string
  password: string
  refreshToken?: string
  role: "ADMIN" | "USER"
}
