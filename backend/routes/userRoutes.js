import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/create', userController.createNewUser);
router.post('/login', userController.getUserByEmailAndPassword);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;