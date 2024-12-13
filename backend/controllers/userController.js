import userService from '../services/userService.js';
import User from '../models/User.js'
//import bcrypt from 'bcryptjs';

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

export const getUserByEmailAndPassword = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Headers:', req.headers);
    const userEmail = req.body.email;
    const userData = await userService.getUserByEmailFromDatabase(userEmail);

    if (!userData) {
      return res.status(404).json({ message: 'User under this email not found' });
    }

    if(userData.password !== req.body.password ){
      console.log("password wrong");
      return res.status(404).json({ message: 'Incorrect password for this user.'})
    }

    res.status(200).json(userData);

  } catch (error) {
    console.error('Error while logging in user:', error.message);

    if (error.message.startsWith('Unable to fetch user with email')) {
      res.status(500).json({ message: 'Internal server error while fetching user.' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }

}

export const createNewUser = async (req, res) => {

  const { firstName, lastName, email, password } = req.body;

  try {
    // Only one user per email.
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Here we protect user data with hashing on password
    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = req.body;
    const userData = await userService.createNewUserInDatabase(user);

    res.status(201).json({ message: 'User registered successfully' });
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
  updateUser,
  getUserByEmailAndPassword
};