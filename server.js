import express from 'express'
import { connect } from './data/database.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js'
import feedbackRouter from './routes/feedback.js'

const app = express()

connect()

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1",userRouter)
app.use("/api/v1",feedbackRouter)

app.listen(8000,()=>{
   console.log("server started running");
})