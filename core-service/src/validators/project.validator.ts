import Joi from "joi"

export const VProjectFindSchema = Joi.object({
  id: Joi.string().required(),
})

export const VProjectCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string()
    .valid("PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED")
    .default("PLANNING")
    .required(),
  deadline: Joi.date().greater("now").required(),
  ownerId: Joi.string().required(),
})

export const VProjectUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"),
  deadline: Joi.date().greater("now"),
})

export const VAddUserToProjectSchema = Joi.object({
  projectId: Joi.string().required(),
  userId: Joi.string().required(),
})