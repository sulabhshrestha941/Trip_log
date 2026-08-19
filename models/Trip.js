const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: String,
    endDate: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    itinerary: [{
        day: Number,
        activity: String,
        location: String
    }],
    expenses: [{
        description: String,
        amount: Number,
        category: String,
        paidBy: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);