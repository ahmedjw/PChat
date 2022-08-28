const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
let messages = [{ name: "ahmed", message: "Hi" }];
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/messages", (req, res) => {
  messages.push(req.body);
  io.emit("message", () => req.body);
  res.send(200);
});
app.get("/messages", (req, res) => {
  res.send(messages);
});
app.use(express.static(__dirname));
var server = http.listen(3000, () => {
  console.log("server is listening on port", server.address().port);
});
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(userId);
});
io.on("connection", (socket) => {
  console.log("a user connected");
});
