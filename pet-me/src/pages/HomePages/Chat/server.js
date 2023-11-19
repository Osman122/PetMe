// set an express server
// create socket.io instance
// listen for incoming connections and logs lma user connects/disconnects
// listen for "message" even w broadcast el msg de to all connected clients

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    // Broadcast elmessage to all connected clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = 3001; // server port number 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});