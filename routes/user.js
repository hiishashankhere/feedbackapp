import express from 'express'
import { validator } from '../middleware/validation.js'
import { allusers, login, register } from '../controllers/user.js'
import { uploads } from '../utils/imageUpload.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post("/register",uploads.single('image'),validator,register)
router.post("/login",login)
router.get("/all",isAuthenticated,allusers)

export default router