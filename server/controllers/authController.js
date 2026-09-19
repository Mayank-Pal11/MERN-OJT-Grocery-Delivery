const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that name, email, and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, email, and password.' 
      });
    }

    // Check whether a user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        message: 'A user with this email already exists.' 
      });
    }

    // Hash the password using bcryptjs with a salt round value of 10
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user using the User model
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return HTTP 201 with a success message and the newly created user's safe data
    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    // Handle unexpected errors with HTTP 500
    console.error('Error in registerUser:', error.message);
    res.status(500).json({ 
      message: 'Server error. Please try again later.' 
    });
  }
};

module.exports = {
  registerUser,
};
