import User from '../models/User.js';

export const getUserByIdFromDatabase = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    throw new Error('Unable to fetch user');
  }
};

export const createNewUserInDatabase = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error('Error creating user', error.message);
    throw new Error('Unable to create user');
  }
};

const userService = {
  getUserByIdFromDatabase,
  createNewUserInDatabase,
};

export default userService;