import { Feedback } from "../model/feedback.js"
import { User } from "../model/user.js"


export const feedback = async (req, res) => {
    try {
        const newFeedback = {
            description: req.body.description,
            owner: req.user._id
        }
        const feedback = await Feedback.create(newFeedback)
        const user = await User.findById(req.user._id)
        user.feedback.push(feedback._id)
        await user.save()

        res.status(201).json({
            success: true,
            feedback
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const likeAndDislike = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id)
        if (!feedback) return res.status(404).json({
            success: false,
            message: "no such id found"
        })

        const user = await User.findById(req.user._id)
        if(!user) return res.status(404).json({
            success:false,
            message:"no user with such id is found"
        })

        if (feedback.likes.includes(req.user._id)) {
            const index = feedback.likes.indexOf(req.user._id)
            feedback.likes.splice(index, 1)
            
            const userIndex = user.likedbyuser.indexOf(feedback._id)
            //console.log(userIndex);
            if(userIndex !== -1){  //here if -1 comes that means feedbackid doesn't exist, if the value is other than -1 that means it exists
                user.likedbyuser.splice(userIndex,1)
            } 

            await feedback.save()
            await user.save()
            res.status(200).json({
                success: true,
                message: "feedback disliked"
            })
        } else {
            feedback.likes.push(req.user._id)
            user.likedbyuser.push(feedback._id)

            await feedback.save()
            await user.save()
            res.status(200).json({
                success: true,
                message: "feedback liked"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addreview = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id)
        if (!feedback) return res.status(404).json({
            success: false,
            message: "no such id found"
        })
        feedback.reviews.push({
            user: req.user._id,
            review: req.body.review
        })
        await feedback.save()
        res.status(200).json({
            success: true,
            message: "reviews added"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}