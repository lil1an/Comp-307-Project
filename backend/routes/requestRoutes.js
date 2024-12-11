import express from 'express';
import requestController from '../controllers/requestController.js';

const router = express.Router();

router.get('/:id', requestController.getRequestById);
router.post('/create', requestController.createNewRequest);

export default router;