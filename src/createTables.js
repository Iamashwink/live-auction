const pool=require('./shared/database/postgres')

const createUserTable=async ()=>{
    await pool.query(
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            usernamE VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `
    )
    console.log('table Created')
}

const createAuctionTables= async ()=>{
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS auctions (
            id SERIAL PRIMARY KEY,
            player_name VARCHAR(255) NOT NULL,
            status VARCHAR(255)
            CHECK (status IN ('UPCOMING', 'LIVE', 'COMPLETED'))
            DEFAULT 'UPCOMING',
            starting_price DECIMAL(10,2) NOT NULL,
            current_price DECIMAL(10,2) NOT NULL,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP NOT NULL,
            seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `
    )
}
const createBidTable=async ()=>{
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS bids(
        id SERIAL PRIMARY KEY,
        auction_id INTEGER NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
        bidder_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `
    )
}
const createTables = async () => {
    try {
        await createUserTable();
        await createAuctionTables();
        await createBidTable()
        console.log("All tables created successfully");
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
};

createTables();