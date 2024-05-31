import express from 'express'
import {isAuthenticated} from '../middleware/auth.js'
import { addreview, feedback, likeAndDislike } from '../controllers/feedback.js'

const router = express.Router()
router.post("/new",isAuthenticated,feedback)
router.get("/feeddetails/:id",isAuthenticated,likeAndDislike)
router.post("/addreview/:id",isAuthenticated,addreview)

export default router