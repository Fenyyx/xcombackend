import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { getSuggestedUsers, getUserProfile, followUnfollowUser, updateUser } from "../controllers/user.controllers.js"



const router = express.Router()
router.get("/profile/:username", getUserProfile)
router.get("/suggested", getSuggestedUsers)
router.post("/follow/:id", followUnfollowUser)
router.post("/update", updateUser)

export default router
