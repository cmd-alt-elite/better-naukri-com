import express from 'express';
import { getAllApplications, getApplicationDetails, createApplication, updateApplication, deleteApplication, getApplicantApplications } from '../controllers/applications.js';

const router = express.Router(); 

router.get('/', getAllApplications);
router.get('/:id', getApplicationDetails);
router.get('/applicant/:applicantId', getApplicantApplications);
router.post('/', createApplication);
router.patch('/:id', updateApplication);
router.delete('/:id', deleteApplication);

export default router;