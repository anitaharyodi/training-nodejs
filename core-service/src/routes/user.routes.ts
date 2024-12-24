import CUser from "@/controllers/user.controller"
import { Router } from "express"

const router = Router()

router.get("/", CUser.getAllUser)
router.get("/:id", CUser.getUserById)
router.patch("/:id/:role", CUser.updateUserRole)

export default router
