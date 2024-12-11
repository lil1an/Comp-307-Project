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
    console.error('Error getting request by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const requestController = {
  getRequestById,
  createNewRequest,
};

export default requestController;