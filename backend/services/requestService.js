import Request from '../models/Request.js';

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

export const getUnansweredRequestsFromBackend = async (req, res) => {
  try {
    const userId = req.params.id
    const declinedRequests = await meetingService.getDeclinedRequestsByUserFromBackend(userId)
    res.status(200).json(declinedRequests)
  } catch (error) {
    console.error(
      `Error getting declined requests for user ${req.params.id}:`,
      error
    )
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getDeclinedRequestsFromBackend = async (req, res) => {
  try {
    const userId = req.params.id
    const declinedRequests = await meetingService.getDeclinedRequestsByUserFromBackend(userId)
    res.status(200).json(declinedRequests)
  } catch (error) {
    console.error(
      `Error getting declined requests for user ${req.params.id}:`,
      error
    )
    res.status(500).json({ message: 'Internal server error' })
  }
}


export default {
  getRequestByIdFromDatabase,
  createNewRequestInDatabase,
  deleteRequestFromDatabase,
  updateRequestInDatabase,
  getUnansweredRequestsFromBackend,
  getDeclinedRequestsFromBackend
};