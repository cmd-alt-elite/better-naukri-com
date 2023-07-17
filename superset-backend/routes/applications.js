import express from 'express';
import { createRecruiter, deleteRecruiter, getRecruiterDetails, getRecruiters, updateRecruiter } from '../controllers/applications.js';

const router = express.Router(); 

router.get('/', getAllApplications);
router.post('/', createApplication);
router.get('/:id', );
router.delete('/:id', deleteApplication);

export default router;