require('dotenv').config()


const pool = require("./shared/database/postgres");
const app=require('./app.js')
PORT=process.env.PORT || 3000


async function start()
{
    try
    {
        await pool.query('SELECT NOW()')
        console.log("Database Connected...")
        

        app.listen(PORT,()=>{
            console.log(`Server Running on port ${PORT}`)
        })
    }
    catch(err)
    {
        console.error(err)
    }
    

}

start()
