// The following sample code uses modern ECMAScript 6 features 
// that aren't supported in Internet Explorer 11.
// To convert the sample for environments that do not support ECMAScript 6, 
// such as Internet Explorer 11, use a transpiler such as 
// Babel at http://babeljs.io/. 
//
// See Es5-chat.js for a Babel transpiled version of the following code:

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/dart-room")
    .build();

connection.on("ReceiveMessage", (user, message) => {
    const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const encodedMsg = user + " says " + msg;
    const li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("Register", (player) => {
    const li = document.createElement("li");
    li.textContent = "registered: " + player.name + ", id: " + player.id;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("Failure", (message) => {
    const li = document.createElement("li");
    li.textContent = message;
    document.getElementById("errorsList").appendChild(li);
});

connection.start().catch(err => console.error(err.toString()));

document.getElementById("sendButton").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
    event.preventDefault();
});

document.getElementById("startRoom").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const roomName = document.getElementById("roomName").value;
    connection.invoke("StartRoom", user, roomName).catch(err => console.error(err.toString()));
    event.preventDefault();
});

document.getElementById("register").addEventListener("click", event => {
    const userName = document.getElementById("userName").value;
    connection.invoke("Register", userName).catch(err => console.error(err.toString()));
    event.preventDefault();
});
