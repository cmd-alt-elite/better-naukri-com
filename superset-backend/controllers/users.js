import { v4 as uuidv4 } from 'uuid';
import { userCollection } from '../config.js';
import { deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

export const getUsers = async (req, res) => {
    
    let users = [];

    await getDocs(userCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        res.status(200).json({users: users});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting users: ${error}`});
    });
}

export const createUser = async (req, res) => {
    const user = req.body;
    const userId = uuidv4();

    await setDoc(doc(userCollection, userId), user).then(() => 
        res.status(200).json({message: `User with name ${user.firstName + ' ' + user.lastName} and ID ${userId} created.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in creating user: ${error}`});
    });
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    await deleteDoc(doc(userCollection, id)).then(() => 
        res.status(200).json({message: `User with ID ${id} deleted.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in deleting user: ${error}`});
    });
}

export const getUserDetails = async (req, res) => {
    const { id } = req.params;

    await getDoc(doc(userCollection, id)).then((docSnap) => {
        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
        } else {
            res.status(400).json({error: `Error in getting user: User not found.`});
        }
    }).catch((error) => {
        res.status(400).json({error: `Error in getting user: ${error}`});
    });
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    
    let updateDetails = {};

    if (firstName) updateDetails.firstName = firstName;
    if (lastName) updateDetails.lastName = lastName;
    if (age) updateDetails.age = age;

    await setDoc(doc(userCollection, id), updateDetails, {merge: true}).then(() => 
        res.status(200).json({message: `User with ID ${id} updated.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in updating user: ${error}`});
    });
}