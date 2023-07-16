import express from 'express';
import { getAllJobs, createJob, getJobDetails, deleteJob, updateJob, searchJobs } from '../controllers/jobs.js'
const router = express.Router(); 

router.get('/', getAllJobs);
router.post('/', createJob);
router.get('/:id', getJobDetails);
router.get('/search/:key', searchJobs);
router.delete('/:id', deleteJob);
router.patch('/:id', updateJob);

export default router;