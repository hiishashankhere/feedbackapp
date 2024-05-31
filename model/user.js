import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const schema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    feedback:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Feedback"
        }
    ],
    likedbyuser:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Feedback"
        }
    ]
},{timestamps:true})

schema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

schema.methods.generateToken = async function(){
    return jwt.sign({ _id: this._id },"feedbackapp")
}

export const User = mongoose.model("User",schema)