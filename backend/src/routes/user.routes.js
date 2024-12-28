import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import {
  getAllUsers,
  getUsersSidebar,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllUsers);
router.get("/sidebar", protectRoute, getUsersSidebar);

router.put("/updateProfileImg", protectRoute, updateProfile);

export default router;
