import CAuth from "@/controllers/auth.controller"
import { Router } from "express"

const router = Router()

router.post("/login", CAuth.login)
router.post("/register", CAuth.register)
router.post("/refresh-token", CAuth.refreshToken)
router.post('/schedulers', CAuth.schedulers)

export default router
