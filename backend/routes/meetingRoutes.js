import express from 'express';
import meetingController from '../controllers/meetingController.js';

const router = express.Router();

router.post('/create', meetingController.createNewMeeting);
router.get('/:id', meetingController.getMeetingById);
router.put('/:id', meetingController.updateMeeting);
router.delete('/:id', meetingController.deleteMeeting);
router.get('/upcoming/:id', meetingController.getUpcomingMeetingsByUserId);
router.get('/hosted/:id', meetingController.getHostedMeetingsByUserId);
router.get('/requested/:id', meetingController.getRequestedMeetingsByUserId);
router.get('/declined/:id', meetingController.getDeclinedMeetingsByUserId);
router.get('/past/:id', meetingController.getPastMeetingsByUserId);
export default router;