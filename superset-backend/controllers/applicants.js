import { v4 as uuidv4 } from 'uuid';
import { applicantCollection } from '../config.js';
import { deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

export const getApplicants = async (req, res) => {
    
    let applicants = [];

    await getDocs(applicantCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            applicants.push(doc.data());
        });
        res.status(200).json({applicants: applicants});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting applicants: ${error}`});
    });
}

export const createApplicant = async (req, res) => {
    let applicant = req.body;
    const applicantId = uuidv4();
    applicant.applicantId = applicantId;

    await setDoc(doc(applicantCollection, applicantId), applicant).then(() => 
        res.status(200).json({message: `Applicant with name ${applicant.firstName + ' ' + applicant.lastName} and ID ${applicantId} created.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in creating applicant: ${error}`});
    });
}

export const deleteApplicant = async (req, res) => {
    const { id } = req.params;
    await deleteDoc(doc(applicantCollection, id)).then(() => 
        res.status(200).json({message: `Applicant with ID ${id} deleted.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in deleting applicant: ${error}`});
    });
}

export const getApplicantDetails = async (req, res) => {
    const { id } = req.params;

    await getDoc(doc(applicantCollection, id)).then((docSnap) => {
        if (docSnap.exists()) {
            res.status(200).json({details: docSnap.data()});
        } else {
            res.status(400).json({error: `Error in getting applicant: Applicant not found.`});
        }
    }).catch((error) => {
        res.status(400).json({error: `Error in getting applicant: ${error}`});
    });
}

export const updateApplicant = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    
    let updateDetails = {};

    if (firstName) updateDetails.firstName = firstName;
    if (lastName) updateDetails.lastName = lastName;
    if (age) updateDetails.age = age;

    await setDoc(doc(applicantCollection, id), updateDetails, {merge: true}).then(() => 
        res.status(200).json({message: `Applicant with ID ${id} updated.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in updating applicant: ${error}`});
    });
}