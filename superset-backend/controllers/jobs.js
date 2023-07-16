import { v4 as uuidv4 } from 'uuid';
import { jobsCollection } from '../config.js';
import { deleteDoc, doc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore/lite';

export const getAllJobs = async (req, res) => {
    
    let jobs = [];

    await getDocs(jobsCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            jobs.push(doc.data());
        });
        res.status(200).json({jobs: jobs});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting jobs: ${error}`});
    });
}

export const searchJobs = async (req, res) => {
    
    let { key } = req.params;
    key = key.toLowerCase();
    let jobs = [];

    const searchQuery = query(jobsCollection, where("searchKey", ">=", key), where("searchKey", "<", key + 'z'));

    await getDocs(searchQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            jobs.push(doc.data());
        });
        res.status(200).json({jobs: jobs});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting jobs: ${error}`});
    });
}

export const createJob = async (req, res) => {
    let job = req.body;
    const searchKey = job.role.toLowerCase();
    job.searchKey = searchKey;
    const jobId = uuidv4();

    await setDoc(doc(jobsCollection, jobId), job).then(() => 
        res.status(200).json({message: `Job with role ${job.role} and ID ${jobId} created.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in creating job: ${error}`});
    });
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    await deleteDoc(doc(jobsCollection, id)).then(() => 
        res.status(200).json({message: `Job with ID ${id} deleted.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in deleting job: ${error}`});
    });
}

export const getJobDetails = async (req, res) => {
    const { id } = req.params;

    await getDoc(doc(jobsCollection, id)).then((docSnap) => {
        if (docSnap.exists()) {
            res.status(200).json({details: docSnap.data()});
        } else {
            res.status(400).json({error: `Error in getting job: job not found.`});
        }
    }).catch((error) => {
        res.status(400).json({error: `Error in getting job: ${error}`});
    });
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { role, companyId, compensation, location } = req.body;
    
    let updateDetails = {};

    if (role) {
        updateDetails.role = role;
        updateDetails.searchKey = role.toLowerCase();
    }
    if (companyId) updateDetails.companyId = companyId;
    if (compensation) updateDetails.compensation = compensation;
    if (location) updateDetails.location = location;

    await setDoc(doc(jobsCollection, id), updateDetails, {merge: true}).then(() => 
        res.status(200).json({message: `Job with ID ${id} updated.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in updating job: ${error}`});
    });
}