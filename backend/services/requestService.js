import Request from '../models/Request.js';
import mongoose from 'mongoose';

export const getRequestByIdFromDatabase = async (requestId) => {
  try {
    const request = await Request.findById(requestId);
    return request || null;
  } catch (error) {
    console.error('Error fetching request by ID:', error.message);
    throw new Error(`Unable to fetch request with ID ${requestId}`);
  }
};

export const createNewRequestInDatabase = async (request) => {
  try {
    const newRequest = await Request.create(request);
    return newRequest;
  } catch (error) {
    console.error('Error creating request:', error.message);
    throw new Error('Unable to create request');
  }
};

export const deleteRequestFromDatabase = async (requestId) => {
  try {
    const result = await Request.findByIdAndDelete(requestId);
    if (!result) {
      throw new Error(`Request with ID ${requestId} not found`)
    }
    return result;

  } catch (error) {
    console.error('Error deleting request:', error);
    throw new Error(`Unable to delete request with ID ${requestId}`);
  }
};

export const updateRequestInDatabase = async (requestId, updatedData) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(requestId, updatedData, { new: true });
    if (!updatedRequest) {
      throw new Error(`Request with ID ${requestId} not found`);
    }
    console.log('Updated request:', updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    throw new Error(`Unable to update request with ID ${requestId}`);
  }
};

export const getUnansweredRequestsFromBackend = async (userId) => {
  try {
    const userObjectId = mongoose.Types.ObjectId.createFromHexString(userId)
    const unansweredRequests = await Request.find({
      userAnswering: { $eq: userObjectId },
      userAnsweringResponse: null 
    })
    .populate('meeting')
    .populate('userAskingAccount')
    .populate('userAnswering')

    const normalizedUnansweredRequests = await normalizeRequestFormats(unansweredRequests);
    return normalizedUnansweredRequests;
  } catch (error) {
    console.error('Error updating request:', error);
    throw new Error(`Unable to get unanswered requests for user with ID ${userId}`);
  }
};

export const getDeclinedRequestsFromBackend = async (userId) => {
  try {
    const userObjectId = mongoose.Types.ObjectId.createFromHexString(userId)
    const declinedRequests = await Request.find({
      userAnswering: { $eq: userObjectId },
      userAnsweringResponse: false 
    })
    .populate('meeting')
    .populate('userAskingAccount')
    .populate('userAnswering')

    const normalizedDeclinedRequests = await normalizeRequestFormats(declinedRequests);
    return normalizedDeclinedRequests;
  } catch (error) {
    console.error('Error updating request:', error);
    throw new Error(`Unable to get declined requests for user with ID ${userId}`);
  }
};

export const normalizeRequestFormats = async (requests) => {
  return Promise.all(
    requests.map((request) => {
      const { id, userAnswering, userAskingAccount, userAskingEmail, userAnsweringResponse, meeting, date, starttime, endtime } = request;
      const hostName = userAskingAccount ? `${userAskingAccount?.firstName} ${userAskingAccount?.lastName}` : userAskingEmail;
      const hostProfilePic = userAskingAccount?.profilePic || null;

      return {
        requestId: request._id,
        id: meeting._id,
        meeting: meeting || null,
        hostProfilePic: hostProfilePic,
        hostName: hostName,
        attendeeId: userAnswering?._id || null,
        attendeeName: `${userAnswering.firstName} ${userAnswering.lastName}`,
        title: meeting.title,
        date: date,
        starttime: starttime,
        endtime: endtime,
        userAnsweringResponse: userAnsweringResponse,
      };
    }) || []
  );
};

export default {
  getRequestByIdFromDatabase,
  createNewRequestInDatabase,
  deleteRequestFromDatabase,
  updateRequestInDatabase,
  getUnansweredRequestsFromBackend,
  getDeclinedRequestsFromBackend
};