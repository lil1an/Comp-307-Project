import Meeting from '../models/Meeting.js';
import User from '../models/User.js';
import { getUserByIdFromDatabase } from './userService.js';
import mongoose from 'mongoose';

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

export const getMeetingsAttendedByUserFromBackend = async (userId) => {
  try {
    const userObjectId = mongoose.Types.ObjectId.createFromHexString(userId)
    const meetingsAttendedByUser = await Meeting.find({
      bookings: {
        $elemMatch: {
          attendee: { $eq: userObjectId }
        }
      }
    }).populate('host');

     const flattenedMeetings = await flattenMeetingTimes(meetingsAttendedByUser, false);
     const filteredMeetings = flattenedMeetings.filter(meeting => meeting.attendeeId.toString() === userObjectId.toString());
     return filteredMeetings;

  } catch (error) {
    console.error('Error fetching meetings attended by user:', error);
    throw new Error(`Unable to fetch meetings attended by user ID ${userId}`);
  }
}

export const getAllMeetingsByUserFromDatabase = async (userId) => {
  try {
    // functions already return flattened list
    const [attendedMeetings, hostedMeetings] = await Promise.all([
      getMeetingsAttendedByUserFromBackend(userId),
      getMeetingsHostedByUserFromBackend(userId)
    ]);

    const allMeetings = [...attendedMeetings, ...hostedMeetings];
    return allMeetings;

  } catch (error) {
    console.error('Error fetching meetings for user:', error);
    throw new Error(`Unable to fetch meetings for user ID ${userId}`);
  }
};


export const getUpcomingMeetingsByUserFromDatabase = async (userId) => {
  try {
    // list already flattened here
    const allMeetings = await getAllMeetingsByUserFromDatabase(userId);
    const currentDate = new Date();

    const futureMeetings = allMeetings.filter(meeting => {
        // const meetingDate = new Date(meeting.bookings.dateAndTime);
        // return meetingDate > currentDate;
        // to do: return to this when we figure out saving
        return true;
    });

    return futureMeetings;
  } catch (error) {
    console.error('Error fetching upcoming meetings for user:', error);
    throw new Error(`Unable to fetch upcoming meetings for user ID ${userId}`);
  }
}

export const getMeetingsHostedByUserFromBackend = async (userId) => {
  try {
    const meetingsHostedByUser = await Meeting.find({ host: userId}).populate('host');
    const flattenedMeetingsHostedByUser = flattenMeetingTimes(meetingsHostedByUser, true);
    return flattenedMeetingsHostedByUser;

  } catch (error) {
    console.error('Error fetching meetings hosted by user:', error);
    throw new Error(`Unable to fetch meetings hosted by user ID ${userId}`);
  }
}

export const getMeetingRequestsByUserFromBackend = async (userId) => {
  try {
    const meetingRequestsForUser = await Request.find({ userAnswering: userId});
    return meetingRequestsForUser || null;

  } catch (error) {
    console.error('Error fetching meetings requests for user:', error);
    throw new Error(`Unable to fetch meetings requests for user ID ${userId}`);
  }
}

export const getDeclinedMeetingsByUserFromBackend = async (userId) => {
  try {
    const meetingRequestsForUser = await Request.find({ userAnswering: userId});
    return meetingRequestsForUser || null;

  } catch (error) {
    console.error('Error fetching declined meetings for user:', error);
    throw new Error(`Unable to fetch declined meetings for user ID ${userId}`);
  }
}

export const getPastMeetingsByUserFromBackend = async (userId) => {
  try {
    // list already flattened here
    const allMeetings = await getAllMeetingsByUserFromDatabase(userId);
    const currentDate = new Date();

    const pastMeetings = allMeetings.filter(meeting => {
        // const meetingDate = new Date(meeting.bookings.dateAndTime);
        // return meetingDate < currentDate;
        // to do: return to this when we figure out saving
        return true;
    });
    return pastMeetings;
  } catch (error) {
    console.error('Error fetching past meetings for user:', error);
    throw new Error(`Unable to fetch past meetings for user ID ${userId}`);
  }
}

async function flattenMeetingTimes(meetings, userisHostingMeeting = false) {
  return Promise.all(
    meetings.flatMap(({ id, host, title, bookings }) => 
      bookings?.map(({ attendee, date, starttime, endtime }) => {
        return getUserByIdFromDatabase(attendee)
          .then(user => {
            const attendeeName = user ? `${user.firstName} ${user.lastName}` : attendee;
            return {
              id: id,
              hostProfilePic: host.profilePic || null,
              hostName: `${host.firstName} ${host.lastName}`,
              attendeeId: user?._id || null,
              attendeeName: attendeeName,
              title: title,
              date: date,
              starttime: starttime,
              endtime: endtime,
              userIsHostingMeeting: userisHostingMeeting
            };
          })
          .catch(error => {
            console.error('Error fetching user:', error);
            return {
              id: id,
              hostProfilePic: host.profilePic || null,
              hostName: `${host.firstName} ${host.lastName}`,
              attendeeId: user?._id || null,
              attendeeName: attendeeName,
              title: title,
              date: date,
              starttime: starttime,
              endtime: endtime,
              userIsHostingMeeting: userisHostingMeeting
            };
          });
      }) || []
    )
  );
}

export default {
  getMeetingByIdFromDatabase,
  createNewMeetingInDatabase,
  deleteMeetingFromDatabase,
  updateMeetingInDatabase,
  getMeetingsAttendedByUserFromBackend,
  getAllMeetingsByUserFromDatabase,
  getUpcomingMeetingsByUserFromDatabase,
  getMeetingsHostedByUserFromBackend,
  getMeetingRequestsByUserFromBackend,
  getDeclinedMeetingsByUserFromBackend,
  getPastMeetingsByUserFromBackend
};