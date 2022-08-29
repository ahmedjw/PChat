const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://<User>:<Password>@cluster0.2johae9.mongodb.net/test"
);

let Message = mongoose.model("Message", {
  name: String,
  message: String,
});
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/messages", (req, res) => {
  let message = new Message(req.body);
  message.save((err) => {
    if (err) res.send(500);
    io.emit("message", () => req.body);
    res.send(200);
  });
});
app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});
io.on("connection", (socket) => {
  console.log("a user connected");
});
server.listen(3000, () => {
  console.log("server is listening on port", server.address().port);
});
