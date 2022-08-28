const express = require("express");
let app = express();
let messages = [{ name: "ahmed", message: "Hi" }];
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/messages", (req, res) => {
  console.log(req.body);
  messages.push(req.body);
  res.send(200);
});
app.get("/messages", (req, res) => {
  res.send(messages);
});
app.use(express.static(__dirname));
app.listen("3000");
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(userId);
});
