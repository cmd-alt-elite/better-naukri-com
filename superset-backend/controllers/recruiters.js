import { v4 as uuidv4 } from 'uuid';
import { recruiterCollection } from '../config.js';
import { deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

export const getRecruiters = async (req, res) => {
    
    let recruiters = [];

    await getDocs(recruiterCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            recruiters.push(doc.data());
        });
        res.status(200).json({recruiters: recruiters});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting recruiters: ${error}`});
    });
}

export const createRecruiter = async (req, res) => {
    let recruiter = req.body;
    const recruiterId = uuidv4();
    recruiter.recruiterId = recruiterId;

    await setDoc(doc(recruiterCollection, recruiterId), recruiter).then(() => 
        res.status(200).json({message: `Recruiter with name ${recruiter.firstName + ' ' + recruiter.lastName} and ID ${recruiterId} created.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in creating recruiter: ${error}`});
    });
}

export const deleteRecruiter = async (req, res) => {
    const { id } = req.params;
    await deleteDoc(doc(recruiterCollection, id)).then(() => 
        res.status(200).json({message: `Recruiter with ID ${id} deleted.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in deleting recruiter: ${error}`});
    });
}

export const getRecruiterDetails = async (req, res) => {
    const { id } = req.params;

    await getDoc(doc(recruiterCollection, id)).then((docSnap) => {
        if (docSnap.exists()) {
            res.status(200).json({details: docSnap.data()});
        } else {
            res.status(400).json({error: `Error in getting recruiter: Recruiter not found.`});
        }
    }).catch((error) => {
        res.status(400).json({error: `Error in getting recruiter: ${error}`});
    });
}

export const updateRecruiter = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    
    let updateDetails = {};

    if (firstName) updateDetails.firstName = firstName;
    if (lastName) updateDetails.lastName = lastName;
    if (age) updateDetails.age = age;

    await setDoc(doc(recruiterCollection, id), updateDetails, {merge: true}).then(() => 
        res.status(200).json({message: `Recruiter with ID ${id} updated.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in updating recruiter: ${error}`});
    });
}