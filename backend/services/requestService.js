import Request from '../models/Request.js';

export const getRequestByIdFromDatabase = async (requestId) => {
  try {
    const request = await Request.findById(requestId);
    return request || null;
  } catch (error) {
    console.error('Error fetching request by ID:', error.message);
    throw new Error('Unable to fetch request');
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

const requestService = {
  getRequestByIdFromDatabase,
  createNewRequestInDatabase,
};

export default requestService;