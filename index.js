async function addMessages() {
  let nameText = document.getElementById("Name").value;
  let messageText = document.getElementById("Message").value;
  let Body = JSON.stringify({ name: nameText, message: messageText });

  await fetch("/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: Body,
  });
  getMessages();
}

async function getMessages() {
  let Response = await fetch("/messages");
  let data = await Response.json();
  let Holder = document.getElementById("messages");
  Holder.innerHTML = "";
  data.map((msg) => {
    let name = document.createElement("h5");
    let nameT = document.createTextNode(msg.name);
    name.append(nameT);
    name.className = "text-warning";
    Holder.append(name);
    let Message = document.createElement("p");
    let text = document.createTextNode(msg.message);
    Message.append(text);
    Message.className = "text-light";
    Holder.append(Message);
  });
  return data;
}
async function addMessage(msg) {}
getMessages();
