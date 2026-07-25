const express=require('express')
const controller=require('./auction.controller.js')
const authenticateToken=require('../shared/middleware/auth.middleware')

const router=express.Router()

router.get('/',controller.getAllAuctions)
router.post('/',authenticateToken,controller.createAuction)
router.get('/:id',controller.getAuctionById)
router.patch('/:id',authenticateToken,controller.updateAuction)
router.delete('/:id',authenticateToken,controller.deleteAuction)
module.exports=router