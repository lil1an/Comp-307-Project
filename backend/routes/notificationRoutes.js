import express from 'express';
import notificationController from '../controllers/notificationController.js';

const router = express.Router();

router.get('/:id', notificationController.getNotificationById);
router.post('/create', notificationController.createNewNotification);

export default router;