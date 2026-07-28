require('dotenv').config()

const http=require('http')
const pool=require("./shared/database/postgres");
const {setIO}=require("./socket/socketManager");
const app=require('./app.js')
const initializeSocket=require('./socket/socket.js')
const server=http.createServer(app)

const io=initializeSocket(server)
setIO(io)
PORT=process.env.PORT || 3000


async function start()
{
    try
    {
        await pool.query('SELECT NOW()')
        console.log("Database Connected...")
        

        server.listen(PORT,()=>{
            console.log(`Server Running  on port ${PORT}`)
        })
    }
    catch(err)
    {
        console.error(err)
    }
    

}

start()
