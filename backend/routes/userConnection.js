// We will put in this file the register and login routes needed to authenticate users.
import express from 'express'; 
//import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Router for routing information
const router = express.Router();

// User Registration Connection
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Only one user by email.
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Here we protect user data with hashing on password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // 
    const newUser = new User({ firstName, lastName, email, password});
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Exporting the userConnection router to other files.
export default router;
