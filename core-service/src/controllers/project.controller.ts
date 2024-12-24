
import { SProject } from "@/services"
import { CustomError, formatResponse } from "@/utils"
import { VAddUserToProjectSchema, VProjectCreateSchema, VProjectFindSchema, VProjectUpdateSchema } from "@/validators"
import { NextFunction, Request, Response } from "express"

const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await SProject.getAllProjects()
    res.json(formatResponse("T", "Success Get All Project", projects))
  } catch (error) {
    next(error)
  }
}

const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.findById(value)
    res.json(formatResponse(true, "Success Get Project By Id", project))
  } catch (error) {
    next(error)
  }
}

const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectCreateSchema.validate(req.body)
    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.createProject(value)
    res.json(formatResponse(true, "Success Create Project", project))
  } catch (error) {
    next(error)
  }
}

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError(400, "Project ID is required");
    }

    const { error, value } = VProjectUpdateSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }

    const existingProject = await SProject.findById({id});
    if (!existingProject) {
      throw new CustomError(404, "Project not found");
    }

    const updateData = { ...value, id };
    const updatedProject = await SProject.updateProject(updateData);

    res.json(formatResponse(true, "Success Update Project", updatedProject));
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.deleteProject(value)
    res.json(formatResponse(true, "Success Delete Project", project))
  } catch (error) {
    next(error)
  }
}
const addUserProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VAddUserToProjectSchema.validate(req.body);
    
    if (error) {
      throw new CustomError(400, error.message);
    }

    console.log('value');
    

    const userProject = await SProject.addUserProject(value);
    res.json(formatResponse(true, "Success added user to project", userProject));
  } catch (error) {
    next(error);
  }
};

const deleteUserProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectFindSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const userProject = await SProject.deleteUserProject(value.id);
    res.json(formatResponse(true, "Success deleted user from project", userProject));
  } catch (error) {
    next(error);
  }
};

const CProject = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addUserProject,
  deleteUserProject
}

export default CProject
