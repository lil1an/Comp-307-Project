import requestService from '../services/requestService.js';

export const getRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const requestData = await requestService.getRequestByIdFromDatabase(requestId);

    if (!requestData) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(requestData);
  } catch (error) {
    console.error('Error getting request by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNewRequest = async (req, res) => {
  try {
    const request = req.body;
    const requestData = await requestService.createNewRequestInDatabase(request);

    res.status(201).json(requestData);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    await requestService.deleteRequestFromDatabase(requestId);

    res.status(204).json();
  } catch (error) {
    console.error(`Error deleting request with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedRequest = req.body;
    const requestData = await requestService.updateRequestInDatabase(requestId, updatedRequest);

    res.status(204).json(requestData);
  } catch (error) {
    console.error('Error updating request in database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUnansweredRequestsByUserId = async (req, res) => {
  try {
    const userId = req.params.id
    const unansweredRequests = await requestService.getUnansweredRequestsFromBackend(userId)
    res.status(200).json(unansweredRequests)
  } catch (error) {
    console.error(
      `Error getting unanswered requests for user ${req.params.id}:`,
      error
    )
    res.status(500).json({ message: 'Internal server error' })
  }
}


export const getDeclinedRequestsByUserId = async (req, res) => {
  try {
    const userId = req.params.id
    const declinedRequests = await requestService.getDeclinedRequestsFromBackend(userId)
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
  getRequestById,
  createNewRequest,
  deleteRequest,
  updateRequest,
  getUnansweredRequestsByUserId,
  getDeclinedRequestsByUserId,
};