const service=require('./auction.service')
const createAuction=async (req,res)=>{
    try{
        const data=req.body
        const auction={
            'playerName':data.playerName,
            'startingPrice':data.startingPrice,
            'status':data.status,
            'startTime':data.startTime,
            'endTime':data.endTime,
            'sellerId':req.user.id
        }
        const result=await service.createAuction(auction)
        return res.status(201).json({
            success:true,
            message:'auction created succesfully',
            data:result
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const getAllAuctions = async (req, res) => {
    try {
        const auctions=await service.getAllAuctions();

        return res.status(200).json({
            success:true,
            data:auctions
        })
    } catch (err) {
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const getAuctionById = async (req, res) => {
    try {
        const id=req.params.id;

        const auction=await service.getAuctionById(id);

        return res.status(200).json({
            success:true,
            data:auction
        })
    } catch (err) {
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
const updateAuction=async (req, res)=>{
    try {
        const auction={
            id: req.params.id,
            sellerId:req.user.id,
            ...req.body
        };

        const result=await service.updateAuction(auction);

        return res.status(200).json({
            success: true,
            message: "Auction updated successfully",
            data: result
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const deleteAuction=async (req, res)=>{
    try {
        const result=await service.deleteAuction(req.params.id,req.user.id);

        return res.status(200).json({
            success: true,
            message: "Auction deleted successfully",
            data: result
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

module.exports={getAllAuctions,getAuctionById,createAuction,updateAuction,deleteAuction}