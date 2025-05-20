const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        console.log("Received data:", req.body); 
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
