import express from 'express';
import { getAllJobs, createJob, getJobDetails, deleteJob, updateJob, searchJobs, getRecruiterJobs } from '../controllers/jobs.js'
const router = express.Router(); 

router.get('/', getAllJobs);
router.post('/', createJob);
router.get('/:id', getJobDetails);
router.get('/recruiter/:recruiterId', getRecruiterJobs);
router.get('/search/:key', searchJobs);
router.delete('/:id', deleteJob);
router.patch('/:id', updateJob);

export default router;