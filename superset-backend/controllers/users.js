import { v4 as uuidv4 } from 'uuid';

let users = [
    {
        firstName: "Sarthak",
        lastName: "Aggarwal",
        age: 19,
        id: '1',
    },
    {
        firstName: "Kartike",
        lastName: "Chopra",
        age: 19,
        id: '2',
    },
    {
        firstName: "Nishant",
        lastName: "Luthra",
        age: 19,
        id: '3',
    },
];

export const getUsers = (req, res) => {
    // console.log(users);
    res.send(users);
}

export const createUser = (req, res) => {
    const user = req.body;
    const userWithId = {...user, id: uuidv4()};
    
    console.log(userWithId);
    users.push(userWithId);
    
    res.send(`User ${user.firstName} ${user.lastName} added to database.`);
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`User with ID ${id} deleted.`);
}

export const getUserDetails = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) res.send(foundUser);
    else res.send('Error: User not found.');
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
        if (firstName) foundUser.firstName = firstName;
        if (lastName) foundUser.lastName = lastName;
        if (age) foundUser.age = age;
        res.send(`User with ID ${foundUser.id} updated.`);
    }
    else res.send('Error: User not found.');
}