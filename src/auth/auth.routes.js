const express=require('express')
const controller=require('./auth.controller.js')

const router=express.Router()

router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/me/:id',controller.getMe)

module.exports=router