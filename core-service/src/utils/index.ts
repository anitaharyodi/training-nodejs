import { BaseResponse, StatusType } from "@/interfaces"
import CustomError from "./customError"
import exclude from "./exclude"
import { generateToken, verifyToken } from "./jwt"

const formatResponse = <T>(status: StatusType, message: string, data: T | [] = []): BaseResponse<T> => {
  return {
    status,
    message,
    data,
  }
}

export { CustomError, generateToken, verifyToken, exclude, formatResponse }
