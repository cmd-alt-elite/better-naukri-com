import express from 'express';
import { createApplicant, deleteApplicant, getApplicantDetails, getApplicants, updateApplicant } from '../controllers/applicants.js';

const router = express.Router(); 

router.get('/', getApplicants);
router.post('/', createApplicant);
router.get('/:id', getApplicantDetails);
router.delete('/:id', deleteApplicant);
router.patch('/:id', updateApplicant);

export default router;