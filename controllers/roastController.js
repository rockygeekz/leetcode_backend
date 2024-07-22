// server/controllers/roastController.js
const Roast = require('../models/roastModel');

// Add a new roast
const addRoast = async (req, res) => {
    const { username, leetcodeUsername, message } = req.body;
    try {
        const newRoast = new Roast({ username, leetcodeUsername, message });
        await newRoast.save();
        res.status(201).json(newRoast);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Update an existing roast
const updateRoast = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
        const updatedRoast = await Roast.findByIdAndUpdate(id, { message }, { new: true });
        if (!updatedRoast) {
            return res.status(404).json({ message: 'Roast not found', success: false });
        }
        res.status(200).json(updatedRoast);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Delete a roast
const deleteRoast = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRoast = await Roast.findByIdAndDelete(id);
        if (!deletedRoast) {
            return res.status(404).json({ message: 'Roast not found', success: false });
        }
        res.status(200).json({ message: 'Roast deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// View all roasts
const getAllRoasts = async (req, res) => {
    try {
        const roasts = await Roast.find({});
        res.status(200).json({ roasts });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    addRoast,
    updateRoast,
    deleteRoast,
    getAllRoasts,
};
