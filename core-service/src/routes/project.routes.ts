
import CProject from "@/controllers/project.controller"
import { Router } from "express"

const router = Router()

router.get("/", CProject.getAllProjects)
router.post("/add-user", CProject.addUserProject)
router.post("/remove-user", CProject.deleteUserProject)
router.get("/:id", CProject.getProjectById)
router.post("/", CProject.createProject)
router.post("/:id", CProject.updateProject)
router.delete("/:id", CProject.deleteProject)

export default router