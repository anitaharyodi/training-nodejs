import { Router } from "express"
import authRouter from "@/routes/auth.routes"
import userRouter from "@/routes/user.routes"
import projectRouter from "@/routes/project.routes"
import taskRouter from "@/routes/task.routes"
import { authMiddleware } from "@/middlewares"

const router = Router()

router.use("/auth", authRouter)
router.use("/users", authMiddleware, userRouter)
router.use("/projects", authMiddleware, projectRouter)
router.use('/tasks', authMiddleware, taskRouter)
export default router
