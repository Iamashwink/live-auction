const express = require("express")
const router = express.Router()
const controller = require("./bid.controller")
const authenticateToken = require("../shared/middleware/auth.middleware")

router.post("/:auctionId/bid",authenticateToken,controller.createBid)

router.get("/:auctionId/bids",controller.getAllBids)
module.exports=router