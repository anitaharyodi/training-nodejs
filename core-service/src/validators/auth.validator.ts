import Joi from "joi"

export const VLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const VRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
})

export const VSchedulerSchema = Joi.object({
  isStart: Joi.boolean().required(),
})
