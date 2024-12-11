import express from 'express';
import meetingController from '../controllers/meetingController.js';

const router = express.Router();

router.post('/create', meetingController.createNewMeeting);
router.get('/:id', meetingController.getMeetingById);
router.put('/:id', meetingController.updateMeeting);
router.delete('/:id', meetingController.deleteMeeting);

export default router;