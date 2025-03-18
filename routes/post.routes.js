import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/post.controllers.js"



const router = express.Router()

router.post("/create",  createPost)
router.delete("/:id", deletePost)
router.post("/comment/:id", commentOnPost)
router.post("/like/:id", likeUnlikePost)
router.get("/all", getAllPosts)
router.get("/likes/:id", getLikedPosts)
router.get("/following", getFollowingPosts)
router.get("/user/:username", getUserPosts)



export default router