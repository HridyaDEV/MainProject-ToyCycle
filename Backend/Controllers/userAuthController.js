const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Provide valid Data" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({ userName , email, password: hashedPassword, role: "user" });
        const savedUser = await newUser.save();

        console.log("Saved user:", savedUser);

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      { expiresIn: process.env.EXPIRING || '1h' } 
    );

    // Respond with token and user details
    res.status(200).json({
      message: "Login successful",
      token,  //  Token is returned here
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
};