const { Server }=require("socket.io");

const initializeSocket = (server) => {
    const io = new Server(server);

    console.log("Socket.IO initialized");

    io.on("connection", (socket) => {
        console.log("========== NEW CONNECTION ==========");
        console.log("Socket ID:", socket.id);

        socket.on("disconnect", (reason) => {
            console.log("DISCONNECT:", socket.id, reason);
        });

        socket.on('joinAuction',(data)=>{
            const room=`auction-${data.auctionId}`
            socket.join(room)
            console.log(`socket added to room -${room}`)
        })
        socket.on('leaveAuction',(data)=>{
            const room=`auction-${data.auctionId}`
            socket.leave(room)
            console.log(`user left the room ${room}`)
        })
    });

    return io;
};

module.exports=initializeSocket;