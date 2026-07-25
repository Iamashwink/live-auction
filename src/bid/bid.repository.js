const pool = require("../shared/database/postgres")

const createBid=async (bid)=>{
    const result=await pool.query(`
        INSERT INTO bids(auction_id,bidder_id,amount)
        VALUES ($1,$2,$3)
        RETURNING *;
        `,
        [bid.auctionId,bid.bidderId,bid.amount]
    )
    return result.rows[0]
}
const getBids=async (id)=>{
    const result= await pool.query(`
        SELECT * 
        FROM bids
        WHERE auction_id=$1
        ORDER BY created_at DESC;`,
        [id]
    )
    return result.rows;
}

module.exports={createBid,getBids}