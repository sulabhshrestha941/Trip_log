const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tagline: String,
    description: String,
    image: String,
    vehicles: [{
        type: String,       // e.g., "4WD Scorpio", "Tourist Bus"
        cost: String,       // e.g., "NPR 15,000 / day"
        route: String
    }]
});

module.exports = mongoose.model('Destination', destinationSchema);