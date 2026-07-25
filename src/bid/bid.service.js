const bidRepository=require('./bid.repository')
const auctionRepository=require('../auction/auction.repository')
const createBid=async (id,amount,user)=>{
    const auction=await auctionRepository.findAuctionById(id)
    if(!auction)
        throw new Error('Auction not found ')
    if(auction.status=='UPCOMING')
        throw new Error('Auction Has not started ')
    if (auction.status=='COMPLETED')
        throw new Error('Auction Ended')
    if(auction.seller_id==user)
        throw new Error('Seller Cannot Bid')
    if(amount<=auction.current_price)
        throw new Error('Current Bid should be greater than the actual')
    const bid={
        amount,
        auctionId:id,
        bidderId:user
    }    
    const res=await bidRepository.createBid(bid);
    await auctionRepository.updateCurrentPrice(id,amount)
    return res
}
const getAllBids=async (id)=>{
    return await bidRepository.getBids(id)
}

module.exports={getAllBids,createBid}