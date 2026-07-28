const { io } = require("socket.io-client");
console.log("Client process started");
const socket = io("http://localhost:8000");

socket.on("connect", () => {
    console.log("Connected to server");
    console.log(socket.id);
    console.log('emmiting join....') 
    socket.emit('joinAuction',{
        auctionId:6
    })
    

    socket.io.on("error", (err) => {
        console.log(err);
    })
}); 
socket.on('newBid',(data)=>{
        console.log(data);
    })   