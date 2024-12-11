import Meeting from '../models/Meeting.js';
import User from '../models/User.js';

export const getMeetingByIdFromDatabase = async (meetingId) => {
  try {
    const meeting = await Meeting.findById(meetingId);
    return meeting || null;
  } catch (error) {
    console.error('Error fetching meeting by ID:', error.message);
    throw new Error(`Unable to fetch meeting with ID ${meetingId}`);
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

export const deleteMeetingFromDatabase = async (meetingId) => {
  try {
    const result = await Meeting.findByIdAndDelete(meetingId);
    if (!result) {
      throw new Error(`Meeting with ID ${meetingId} not found`)
    }
    return result;

  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error(`Unable to delete meeting with ID ${meetingId}`);
  }
};

export const updateMeetingInDatabase = async (meetingId, updatedData) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(meetingId, updatedData, { new: true });
    if (!updatedMeeting) {
      throw new Error(`Meeting with ID ${meetingId} not found`);
    }
    console.log('Updated meeting:', updatedMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error(`Unable to update meeting with ID ${meetingId}`);
  }
};

export default {
  getMeetingByIdFromDatabase,
  createNewMeetingInDatabase,
  deleteMeetingFromDatabase,
  updateMeetingInDatabase
};