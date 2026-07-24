const bcrypt=require('bcrypt')
const repository=require('./auth.repository')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const register=async (username,email,password)=>{
    const existingUser=await repository.findUserByEmail(email)

    if(existingUser)
    {
        throw new Error('Email Already Exist')
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await repository.createUser(username,email,hashedPassword);
    const accessToken=jwt.sign({
        "id":user.id,
        "username":user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:'10m'}
    )
    return accessToken
}
const login=async (email,password)=>{
    const user=await repository.findUserByEmail(email)

    if(!user)
    {
        throw new  Error('Invalid Credentials')
    }

    const isPassword= await bcrypt.compare(password,user.password)
    if(!isPassword)
        throw new Error('Invalid Credentials')
    const accessToken=jwt.sign({
        "id":user.id,
        "username":user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:'10m'}
    )


    return accessToken
}

const getMe=async (id) =>{
    return await repository.findUserById(id);
}

module.exports={getMe,login,register}