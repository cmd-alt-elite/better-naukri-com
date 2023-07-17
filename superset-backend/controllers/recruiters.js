import { v4 as uuidv4 } from 'uuid';
import { recruitersCollection } from '../config.js';
import { deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

export const getRecruiters = async (req, res) => {
    
    let recruiters = [];

    await getDocs(recruitersCollection).then((querySnapshot) => {
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
    
    const doesExistQuery = query(recruitersCollection, where("email", "==", recruiter.email));
    let querySnapshot = await getDocs(doesExistQuery);

    if (querySnapshot && querySnapshot.docs.length > 0) {
        res.status(200).json({message: "Recruiter already exists, skipping registration.", recruiterId: querySnapshot.docs[0].data().recruiterId});
    } else {
        const recruiterId = uuidv4();
        recruiter.recruiterId = recruiterId;

        await setDoc(doc(recruitersCollection, recruiterId), recruiter).then(() => 
            res.status(200).json({message: `Recruiter with name ${recruiter.name} and ID ${recruiterId} created.`, recruiterId: recruiterId})
        ).catch((error) => {
            res.status(400).json({error: `Error in creating recruiter: ${error}`});
        });
    }
}

export const deleteRecruiter = async (req, res) => {
    const { id } = req.params;
    await deleteDoc(doc(recruitersCollection, id)).then(() => 
        res.status(200).json({message: `Recruiter with ID ${id} deleted.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in deleting recruiter: ${error}`});
    });
}

export const getRecruiterDetails = async (req, res) => {
    const { id } = req.params;

    await getDoc(doc(recruitersCollection, id)).then((docSnap) => {
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
    const { name } = req.body;
    
    let updateDetails = {};

    if (name) updateDetails.name = name;

    await setDoc(doc(recruitersCollection, id), updateDetails, {merge: true}).then(() => 
        res.status(200).json({message: `Recruiter with ID ${id} updated.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in updating recruiter: ${error}`});
    });
}