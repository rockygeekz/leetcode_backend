const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModels");
const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if a user with the same email exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists. Please login.', success: false });
        }
        
        // Create a new instance of UserModel
        const newUser = new UserModel({ name, email, password });

        // Hash the password using bcrypt with a salt round of 10
        newUser.password = await bcrypt.hash(password, 10);

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: "Signup successfully", success: true });
    } catch (err) {
        // Handle any errors that occur during signup
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email in the database
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication failed. Email or password is wrong.';
        
        // If user is not found, return authentication failed
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        
        // Compare the provided password with the hashed password stored in the database
        const isPassEqual = await bcrypt.compare(password, user.password);
        
        // If passwords do not match, return authentication failed
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        
        // Generate a JWT token with user email and _id payload, valid for 24 hours
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Respond with login success message, JWT token, email, and name
        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        // Handle any errors that occur during login
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
module.exports={
    loginController,
    signupController
}