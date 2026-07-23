const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')

const app=express()

const authRouter=require('./auth/auth.routes.js')
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.get('/',(req,res)=>{
    return res.send(`Server Running on port ${PORT}`)
})

module.exports=app