import Joi from "joi"

export const VTaskFindSchema = Joi.object({
  id: Joi.string().required(),
})

export const VTaskCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string()
    .valid("TODO", "IN_PROGRESS", "COMPLETED")
    .default("TODO")
    .required(),
  dueDate: Joi.date().greater("now").required(),
  projectId: Joi.string().required(),
  assigneeId: Joi.string().required(),
})

export const VTaskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("TODO", "IN_PROGRESS", "COMPLETED"),
  dueDate: Joi.date().greater("now"),
})

export const VTaskFindByProjectSchema = Joi.object({
  projectId: Joi.string().required(),
})