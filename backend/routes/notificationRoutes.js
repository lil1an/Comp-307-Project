import express from 'express';
import notificationController from '../controllers/notificationController.js';

const router = express.Router();

router.post('/create', notificationController.createNewNotification);
router.get('/:id', notificationController.getNotificationById);
router.get('/userId/:id', notificationController.getNotificationListByUserId);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

export default router;