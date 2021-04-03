const users = [];

const addUser = ({ id, userName, room }) => {
    //Clean the data
    console.log("users ", id, userName, room);
    userName = userName.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //Validate the data
    if (!userName || !room) {
        return {
            error: "UserName and room are required",
        };
    }

    //Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.userName === userName;
    });

    //Validate userName
    if (existingUser) {
        return {
            error: "UserName is in use!",
        };
    }

    //Store user
    const user = { id, userName, room };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

//find and filter gives you access to the user object
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};
