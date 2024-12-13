import User from '../models/User.js';

export const getUserByIdFromDatabase = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    throw new Error(`Unable to fetch user with ID ${userId}`);
  }
};

export const getUserByEmailFromDatabase = async (userEmail) => {
  try {
    const user = await User.findOne({email:userEmail});
    return user || null;
  } catch (error) {
    console.error('Error fetching user by email:', error.message);
    throw new Error(`Unable to fetch user with email ${userEmail}`);
  }
};

export const createNewUserInDatabase = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw new Error('Unable to create user');
  }
};

export const deleteUserFromDatabase = async (userId) => {
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      throw new Error(`User with ID ${userId} not found`)
    }
    return result;

  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error(`Unable to delete user with ID ${userId}`);
  }
};

export const updateUserInDatabase = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    console.log('Updated user:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(`Unable to update user with ID ${userId}`);
  }
};

export default {
  getUserByIdFromDatabase,
  createNewUserInDatabase,
  deleteUserFromDatabase,
  updateUserInDatabase,
  getUserByEmailFromDatabase
};