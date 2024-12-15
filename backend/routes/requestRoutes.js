import express from 'express';
import requestController from '../controllers/requestController.js';

const router = express.Router();

router.post('/create', requestController.createNewRequest);
router.get('/:id', requestController.getRequestById);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);
router.get('/unanswered/:id', requestController.getUnansweredRequestsByUserId);
router.get('/declined/:id', requestController.getDeclinedRequestsByUserId);

export default router;