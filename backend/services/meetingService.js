import Meeting from '../models/Meeting.js';
import User from '../models/User.js';

export const getMeetingByIdFromDatabase = async (meetingId) => {
  try {
    const meeting = await Meeting.findById(meetingId);
    return meeting || null;
  } catch (error) {
    console.error('Error fetching meeting by ID:', error.message);
    throw new Error('Unable to fetch meeting');
  }
};

export const createNewMeetingInDatabase = async (meeting) => {
  try {
    const userExists = await User.findById(meeting.host);
    if (!userExists) {
      throw new Error('Host user does not exist');
    }

    const newMeeting = await Meeting.create(meeting);
    return newMeeting;
  } catch (error) {
    console.error('Error creating meeting:', error.message);
    throw new Error('Unable to create meeting');
  }
};

const meetingService = {
  getMeetingByIdFromDatabase,
  createNewMeetingInDatabase,
};

export default meetingService;