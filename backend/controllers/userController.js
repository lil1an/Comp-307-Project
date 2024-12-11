import userService from '../services/userService.js';

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await userService.getUserByIdFromDatabase(userId);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const user = req.body;
    const userData = await userService.createNewUserInDatabase(user);

    res.status(201).json(userData);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.deleteUserFromDatabase(userId);

    res.status(204).json();
  } catch (error) {
    console.error(`Error deleting user with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const userData = await userService.updateUserInDatabase(userId, updatedUser);

    res.status(204).json(userData);
  } catch (error) {
    console.error('Error updating user in database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  getUserById,
  createNewUser,
  deleteUser,
  updateUser
};