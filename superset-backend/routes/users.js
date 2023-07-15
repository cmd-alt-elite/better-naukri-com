import express from 'express';
import { createUser, deleteUser, getUserDetails, getUsers, updateUser } from '../controllers/users.js';

const router = express.Router(); 

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserDetails);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;