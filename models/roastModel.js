// server/models/roastModel.js
const mongoose = require('mongoose');

const RoastSchema = new mongoose.Schema({
    username: { type: String, required: true },
    leetcodeUsername: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const Roast = mongoose.model('Roast', RoastSchema);

module.exports = Roast;
