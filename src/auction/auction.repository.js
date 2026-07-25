const pool = require('../shared/database/postgres')

const createAuction= async (auction)=>{
    const result=await pool.query(
        `INSERT INTO auctions(player_name,starting_price,current_price,start_time,end_time,seller_id)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING id,player_name,starting_price,current_price,start_time,end_time,seller_id,created_at`,
        [auction.playerName,auction.startingPrice,auction.currentPrice,auction.startTime,auction.endTime,auction.sellerId]
    )
    return result.rows[0]
}

const findAllAuctions=async ()=>{
    const result=await pool.query(
        `SELECT * FROM auctions WHERE status!='COMPLETED'
        `
    )
    return result.rows
}

const findAuctionById=async (id)=>{
    const result=await pool.query(
        `SELECT *
        FROM auctions
        WHERE id=$1`,
        [id]
    )
    return result.rows[0]
}

const updateAuction=async (auction)=>{
    const result=await pool.query(
        `UPDATE auctions
        SET player_name=$1,
        starting_price=$2,
        current_price=$3,
        start_time=$4,
        end_time=$5
        WHERE id=$6
        RETURNING *
        `,
        [auction.playerName,auction.startingPrice,auction.currentPrice,auction.startTime,auction.endTime,auction.id]
    )
    return result.rows[0]
}

const deleteAuction=async (id)=>{
    const result=await pool.query(
        `DELETE FROM auctions
        WHERE id=$1
        RETURNING *`,
        [id]
    )
    return result.rows[0]
}
module.exports={deleteAuction,updateAuction,findAllAuctions,findAuctionById,createAuction}