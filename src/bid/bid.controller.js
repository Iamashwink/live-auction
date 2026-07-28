const service=require("./bid.service")
const { getIO }=require("../socket/socketManager");
const createBid=async (req,res)=>{
    try{
        const auctionId=req.params.auctionId
        const amount=req.body.amount
        const bidderId=req.user.id

        const result=await service.createBid(
            auctionId,
            amount,
            bidderId
        );
        const io=getIO()
        io.to(`auction-${auctionId}`).emit('newBid',{
            bidId:result.id,
            auctionId:result.auctionId,
            amount:result.amount,
            bidderId:result.bidderId,
            createdAt:result.createdAt
        })
        return res.status(201).json({
            success:true,
            message:"Bid placed successfully",
            data:result
        });
    }catch(err)
    {
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

const getAllBids=async (req,res)=>{
    try{
        const auctionId=req.params.auctionId

        const result=await service.getAllBids(auctionId)

        return res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

module.exports={createBid,getAllBids}