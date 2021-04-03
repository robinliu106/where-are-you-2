// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

// import openSocket from "socket.io-client";
// const socket = openSocket("http://localhost:4001");
// const LandingPage = () => {
//     const [userName, setUserName] = useState("");
//     const [room, setRoom] = useState("");
//     let history = useHistory();

//     const join = () => {
//         socket.emit("join", { userName, room }, (error) => {
//             if (error) {
//                 console.log(error);
//             }
//             console.log("SOCKET emit join");
//             history.push("/game");
//         });
//     };

//     return (
//         <div>
//             <form onSubmit={join}>
//                 <input
//                     className="form-control form-control-lg"
//                     type="text"
//                     placeholder="Name"
//                     onChange={(e) => setUserName(e.target.value)}
//                 />
//                 <input
//                     className="form-control form-control-lg"
//                     type="text"
//                     placeholder="Join a game!"
//                     onChange={(e) => setRoom(e.target.value)}
//                 />
//                 <button type="submit" className="btn btn-primary">
//                     Go
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default LandingPage;
