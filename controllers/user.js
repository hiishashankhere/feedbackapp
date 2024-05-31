import { Feedback } from "../model/feedback.js"
import { User } from "../model/user.js"
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(404).json({
            success: false,
            message: "user already exists"
        })
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        })
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()

        res.status(201).json({
            success: true,
            message: "user registered successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({
            success: false,
            message: "register first"
        })

        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(404).json({
            success: false,
            message: "invalid credentials"
        })

        const token = await user.generateToken()
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 90),
            httpOnly: true
        }).json({
            success: true,
            message: "logged in successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const allusers = async (req, res) => {
    try {
        const { keyword = '',page=1,limit=2 } = req.query
        const pageNum = parseInt(page,10)
        const limitPage = parseInt(limit,10)
        const skip = (pageNum - 1)*limitPage
        const user = await User.aggregate([
            {
                $match: {name:{ $regex: keyword, $options: 'i' }}
            },
            {
                $skip:skip
            },
            {
                $limit:limitPage
            }
        ])
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
