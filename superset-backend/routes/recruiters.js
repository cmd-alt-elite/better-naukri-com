import express from 'express';
import { createRecruiter, deleteRecruiter, getRecruiterDetails, getRecruiters, updateRecruiter } from '../controllers/recruiters.js';

const router = express.Router(); 

router.get('/', getRecruiters);
router.post('/', createRecruiter);
router.get('/:id', getRecruiterDetails);
router.delete('/:id', deleteRecruiter);
router.patch('/:id', updateRecruiter);

export default router;