const service=require('./auth.service')

const register=async (req,res)=>{
    try{
        const {username,email,password}=req.body
        const user=await service.register(username,email,password)
        return res.status(201).json({
            success:true,
            data:user
        })
    }
    catch(err)
    {
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const login=async (req,res)=>{
    try{
        const {email,password}=req.body
        const msg=await service.login(email,password)
        return res.status(200).json({
            success:true,
            data:msg
        })
    }
    catch(err)
    {
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
}
const getMe=async (req,res)=>{
    const {id}=req.params
    try{
        const user=await service.getMe(id)
        return res.status(200).json({
            success:true,
            data:user
        })

    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={getMe,login,register}