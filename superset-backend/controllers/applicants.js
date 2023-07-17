import { v4 as uuidv4 } from 'uuid';
import { applicantsCollection } from '../config.js';
import { deleteDoc, doc, getDoc, getDocs, setDoc, where, query } from 'firebase/firestore/lite';

export const getApplicants = async (req, res) => {
    
    let applicants = [];

    await getDocs(applicantsCollection).then((querySnapshot) => {
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
    const doesExistQuery = query(applicantsCollection, where("email", "==", applicant.email));

    let querySnapshot = await getDocs(doesExistQuery);

    if (querySnapshot && querySnapshot.docs.length > 0) {
        res.status(400).json({error: "Error in creating applicant: applicant already exists."});
    } else {
        const applicantId = uuidv4();
        applicant.applicantId = applicantId;

        await setDoc(doc(applicantsCollection, applicantId), applicant).then(() => 
            res.status(200).json({message: `Applicant with name ${applicant.name} and ID ${applicantId} created.`})
        ).catch((error) => {
            res.status(400).json({error: `Error in creating applicant: ${error}`});
        });
    }
}

export const deleteApplicant = async (req, res) => {
    const { id } = req.params;
    await deleteDoc(doc(applicantsCollection, id)).then(() => 
        res.status(200).json({message: `Applicant with ID ${id} deleted.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in deleting applicant: ${error}`});
    });
}

export const getApplicantDetails = async (req, res) => {
    const { id } = req.params;

    await getDoc(doc(applicantsCollection, id)).then((docSnap) => {
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
    const { name } = req.body;
    
    let updateDetails = {};

    if (name) updateDetails.name = name;

    await setDoc(doc(applicantsCollection, id), updateDetails, {merge: true}).then(() => 
        res.status(200).json({message: `Applicant with ID ${id} updated.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in updating applicant: ${error}`});
    });
}