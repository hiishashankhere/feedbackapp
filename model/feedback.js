import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    image: {
        type: String
    },
    description:{
        type:String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            review:{
                type:String
            }
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
}, { timestamps: true })

export const Feedback = mongoose.model("Feedback",schema)