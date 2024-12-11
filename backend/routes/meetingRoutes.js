import express from 'express';
import meetingController from '../controllers/meetingController.js';

const router = express.Router();

router.get('/:id', meetingController.getMeetingById);
router.post('/create', meetingController.createNewMeeting);

export default router;