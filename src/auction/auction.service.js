const repository=require('./auction.repository')

const createAuction=async(auction)=>{
    if(!auction.playerName || !auction.startTime || !auction.startingPrice || !auction.endTime)
        throw new Error('Missing fields')
    const start = new Date(auction.startTime);
    const end = new Date(auction.endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date");
    }
    if (start >= end)
        throw new Error("Invalid auction time");

    if(auction.startingPrice<=0)
        throw new Error('Price Must be greater than 0')
    auction.currentPrice=auction.startingPrice
    return await repository.createAuction(auction)
}

const getAllAuctions=async()=>{
    return repository.findAllAuctions()
}

const getAuctionById=async (id)=>{
    const auction=await repository.findAuctionById(id)
    if(!auction)
        throw new Error("No Auction Found")
    return auction
}
const updateAuction=async (auction)=>{
    const existingAuction=await repository.findAuctionById(auction.id)

    if (!existingAuction) {
        throw new Error("Auction not found")
    }
    if (auction.sellerId!=existingAuction.seller_id)
        throw new Error('Unauthorized to delete')
    const updatedAuction={
        id: existingAuction.id,
        playerName: auction.playerName ?? existingAuction.player_name,
        startingPrice: auction.startingPrice ?? existingAuction.starting_price,
        currentPrice: existingAuction.current_price,
        startTime: auction.startTime ?? existingAuction.start_time,
        endTime: auction.endTime ?? existingAuction.end_time
    }

    const start=new Date(updatedAuction.startTime)
    const end=new Date(updatedAuction.endTime)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date")
    }

    if (start>=end) {
        throw new Error("Invalid auction time")
    }

    if (updatedAuction.startingPrice<=0) {
        throw new Error("Price must be greater than 0")
    }

    return repository.updateAuction(updatedAuction)
}

const deleteAuction=async (id,sellerId)=>{
    const auction=await repository.findAuctionById(id)

    if (!auction) {
        throw new Error("Auction not found")
    }
    if(auction.seller_id!=sellerId)
        throw new Error('Unauthorized to delete')
    return repository.deleteAuction(id)
}

module.exports={getAllAuctions,createAuction,getAuctionById,updateAuction,deleteAuction}