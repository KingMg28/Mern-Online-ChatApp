import express from "express"

import protectRoute from "../middleware/protectRoute.js"
import { getAllUsers, getUsersSidebar } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", protectRoute, getAllUsers)
router.get("/sidebar", protectRoute, getUsersSidebar)

export default router