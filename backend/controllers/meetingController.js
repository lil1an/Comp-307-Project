import meetingService from '../services/meetingService.js';

export const getMeetingById = async (req, res) => {
  try {
    const meetingId = req.params.id;
    const meetingData = await meetingService.getMeetingByIdFromDatabase(meetingId);

    if (!meetingData) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meetingData);
  } catch (error) {
    console.error('Error getting meeting by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNewMeeting = async (req, res) => {
  try {
    const meeting = req.body;
    const meetingData = await meetingService.createNewMeetingInDatabase(meeting);

    res.status(201).json(meetingData);
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;
    await meetingService.deleteMeetingFromDatabase(meetingId);

    res.status(204).json();
  } catch (error) {
    console.error(`Error deleting meeting with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;
    const updatedMeeting = req.body;
    const meetingData = await meetingService.updateMeetingInDatabase(meetingId, updatedMeeting);

    res.status(204).json(meetingData);
  } catch (error) {
    console.error('Error updating meeting in database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMeetingsAttendedByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const attendedMeetings = await meetingService.getMeetingsAttendedByUserFromBackend(userId);

    res.status(200).json(attendedMeetings);
  } catch (error) {
    console.error(`Error getting meetings attended by user ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMeetingsHostedByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const hostedMeetings = await meetingService.getMeetingsHostedByUserFromBackend(userId);

    res.status(200).json(hostedMeetings);
  } catch (error) {
    console.error(`Error getting meetings hosted by user ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMeetingRequestsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const meetingRequests = await meetingService.getMeetingRequestsByUserFromBackend(userId);

    res.status(200).json(meetingRequests);
  } catch (error) {
    console.error(`Error getting meeting requests for user ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  getMeetingById,
  createNewMeeting,
  deleteMeeting,
  updateMeeting,
  getMeetingsAttendedByUserId,
  getMeetingsHostedByUserId,
  getMeetingRequestsByUserId,
};