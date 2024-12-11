import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', userController.getUserById);
router.post('/create', userController.createNewUser);

export default router;