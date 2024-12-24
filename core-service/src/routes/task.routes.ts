

import CTask from "@/controllers/task.controller"
import { Router } from "express"

const router = Router()

router.get("/", CTask.getAllTasks)
router.post("/", CTask.createTask)
router.get("/:id", CTask.getDetailTask)
router.post("/:id", CTask.updateTask)
router.delete("/:id", CTask.deleteTask)
router.get("/project/:projectId", CTask.getTaskByProjectId)

export default router