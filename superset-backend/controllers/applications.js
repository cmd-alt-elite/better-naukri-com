import { v4 as uuidv4 } from 'uuid';
import { applicationsCollection } from '../config.js';
import { deleteDoc, doc, getDoc, getDocs, setDoc, where, query, and } from 'firebase/firestore/lite';

export const getAllApplications = async (req, res) => {
    
    let applications = [];

    await getDocs(applicationsCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            applications.push(doc.data());
        });
        res.status(200).json({applications: applications});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting applications: ${error}`});
    });
}

export const getApplicantApplications = async (req, res) => {
    
    let applications = [];
    const { applicantId } = req.params; 

    await getDocs(query(applicationsCollection, where("applicantId", "==", applicantId))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            applications.push(doc.data());
        });
        res.status(200).json({applications: applications});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting applications: ${error}`});
    });
}

export const getJobApplications = async (req, res) => {
    
    let applications = [];
    const { jobId } = req.params; 

    await getDocs(query(applicationsCollection, where("jobId", "==", jobId))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            applications.push(doc.data());
        });
        res.status(200).json({applications: applications});
    }).catch((error) => {
        res.status(400).json({error: `Error in getting applications: ${error}`});
    });
}

export const createApplication = async (req, res) => {
    let application = req.body;

    const doesExistQuery = query(applicationsCollection, and(where("applicantId", "==", application.applicantId), where("jobId", "==", application.jobId)));
    let querySnapshot = await getDocs(doesExistQuery);

    if (querySnapshot && querySnapshot.docs.length > 0) {
        res.status(400).json({message: "Error: Applicant has already applied for this job.", applicationId: querySnapshot.docs[0].data().applicationId});
    } else {
        const applicationId = uuidv4();
        application.applicationId = applicationId;
        application.status = "Applied";
        application.appliedAt = new Date().toISOString();

        await setDoc(doc(applicationsCollection, applicationId), application).then(() => 
            res.status(200).json({message: `Application with ID ${applicationId} created.`, applicationId: applicationId})
        ).catch((error) => {
            res.status(400).json({error: `Error in creating application: ${error}`});
        });
    }
}

export const deleteApplication = async (req, res) => {
    const { id } = req.params;
    await deleteDoc(doc(applicationsCollection, id)).then(() => 
        res.status(200).json({message: `Application with ID ${id} deleted.`})
    ).catch((error) => {
        res.status(400).json({error: `Error in deleting application: ${error}`});
    });
}

export const getApplicationDetails = async (req, res) => {
    const { id } = req.params;

    await getDoc(doc(applicationsCollection, id)).then((docSnap) => {
        if (docSnap.exists()) {
            res.status(200).json({details: docSnap.data()});
        } else {
            res.status(400).json({error: `Error in getting application: Application not found.`});
        }
    }).catch((error) => {
        res.status(400).json({error: `Error in getting application: ${error}`});
    });
}

export const updateApplication = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    let updateDetails = {};
    updateDetails.updatedAt = new Date().toISOString();

    if (status) updateDetails.status = status;

    const doesExistQuery = query(applicationsCollection, where("applicationId", "==", id));

    const querySnapshot = await getDocs(doesExistQuery);

    if (querySnapshot && querySnapshot.docs.length > 0) {
        await setDoc(doc(applicationsCollection, id), updateDetails, {merge: true}).then(() => 
            res.status(200).json({message: `Application with ID ${id} updated.`})
        ).catch((error) => {
            res.status(400).json({error: `Error in updating application: ${error}`});
        });
    } else {
        res.status(400).json({error: "Error: Application does not exist."});
    }
}