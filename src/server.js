// const path = require("path");
// const express = require("express");
// const http = require("http");
// const socketio = require("socket.io");
// const util = require("util");
// const cors = require("cors");

// const { generateMessage, generateLocationMessage } = require("./utils/messages");

// const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// const port = process.env.port || 4001;
// const publicDirectoryPath = path.join(__dirname, "../public");

// app.use(express.static(publicDirectoryPath));
// app.use(cors());

// io.on("connection", (socket) => {
//     console.log("New web socket connection");

//     socket.on("join", (options, callback) => {
//         console.log('server options',options)
//         const { error, user } = addUser({ id: socket.id, ...options });

//         if (error) {
//             return callback(error);
//         }

//         socket.join(user.room);

//         socket.emit("message", generateMessage("Admin", "Welcome!"));

//         socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`));

//         io.to(user.room).emit("roomData", {
//             room: user.room,
//             users: getUsersInRoom(user.room),
//         });

//         callback();
//     });

//     socket.on("sendMessage", async (message, callback) => {
//         const user = getUser(socket.id);

//         io.to(user.room).emit("message", generateMessage(user.username, message));

//         callback();
//     });

//     socket.on("disconnect", () => {
//         const user = removeUser(socket.id);

//         if (user) {
//             io.to(user.room).emit("message", generateMessage("Admin", `${user.username} has left Room:${user.room}`));

//             io.to(user.room).emit("roomData", {
//                 room: user.room,
//                 users: getUsersInRoom(user.room),
//             });
//         }
//     });

//     socket.on("sendLocation", (location, callback) => {
//         const user = getUser(socket.id);

//         io.to(user.room).emit(
//             "locationMessage",
//             generateLocationMessage(
//                 user.username,
//                 `https://google.com/maps?q=${location.latitude},${location.longitude}`
//             )
//         );

//         callback();
//     });
// });

// server.listen(port, () => {
//     console.log(`Server is up on port: ${port}`);
// });
