const express = require('express');
const router = express.Router();

// In-memory array of destinations with distinct, verified image URLs
let nepalDestinations = [
    {
        id: 'pokhara',
        name: 'Pokhara',
        tagline: 'The City of Lakes & Paragliding',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
        description: 'Gateway to the Annapurna Circuit, featuring Phewa Lake, Sarangkot, and World Peace Pagoda.',
        vehicles: [
            { type: 'Tourist Bus', cost: 'NPR 1,200', route: 'Kathmandu to Pokhara (7-8 hrs)' },
            { type: 'Private SUV/Car', cost: 'NPR 12,000', route: 'Kathmandu to Pokhara (5-6 hrs)' },
            { type: 'Domestic Flight', cost: 'NPR 4,500', route: 'KTM Airport to Pokhara (25 mins)' }
        ],
        hotels: [
            { name: 'Hotel Barahi', category: 'Luxury / Mid-range', price: 'NPR 8,000 / night' },
            { name: 'Waterfront Resort', category: 'Lake View', price: 'NPR 12,000 / night' },
            { name: 'Lakeside Hostel', category: 'Budget / Student', price: 'NPR 1,500 / night' }
        ]
    },
    {
        id: 'mustang',
        name: 'Upper Mustang',
        tagline: 'The Last Forbidden Kingdom',
        image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&auto=format&fit=crop&q=80',
        description: 'Trans-Himalayan desert landscapes, Muktinath Temple, Kagbeni, and ancient Tibetan caves.',
        vehicles: [
            { type: '4WD Scorpio Jeep', cost: 'NPR 35,000 (Round Trip)', route: 'Pokhara to Jomsom/Muktinath' },
            { type: 'Offroad Motorbike', cost: 'NPR 3,500 / day', route: 'Pokhara - Jomsom Circuit' }
        ],
        hotels: [
            { name: 'Om\'s Home Jomsom', category: 'Mid-range', price: 'NPR 4,500 / night' },
            { name: 'Hotel Grand Gau', category: 'Standard Tea House', price: 'NPR 2,000 / night' }
        ]
    },
    {
        id: 'chitwan',
        name: 'Chitwan National Park',
        tagline: 'Jungle Safari & Wildlife Haven',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
        description: 'Home to the One-Horned Rhino, Royal Bengal Tiger, canoe rides, and Tharu cultural dances.',
        vehicles: [
            { type: 'Tourist Bus', cost: 'NPR 1,000', route: 'Kathmandu / Pokhara to Sauraha' },
            { type: 'Private Car', cost: 'NPR 9,000', route: 'Kathmandu to Sauraha' }
        ],
        hotels: [
            { name: 'Barahi Jungle Lodge', category: 'Luxury Safari', price: 'NPR 18,000 / night' },
            { name: 'Green Park Chitwan', category: 'Resort', price: 'NPR 7,000 / night' },
            { name: 'Chitwan Riverside Resort', category: 'Budget', price: 'NPR 2,500 / night' }
        ]
    },
    {
        id: 'rara',
        name: 'Rara Lake',
        tagline: 'Queen of Lakes in Mugu',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
        description: 'Nepal\'s largest high-altitude lake surrounded by pine forests and pristine wilderness.',
        vehicles: [
            { type: 'Flight + Trek', cost: 'NPR 12,000', route: 'KTM -> Nepalgunj -> Talcha Airport -> Walk 3 hrs' },
            { type: 'Offroad Jeep', cost: 'NPR 40,000', route: 'Surkhet to Mugu (2 Days)' }
        ],
        hotels: [
            { name: 'Village Heritage Resort', category: 'Standard Lodge', price: 'NPR 3,000 / night' },
            { name: 'National Park Camping Area', category: 'Tent / Camping', price: 'NPR 1,000 / night' }
        ]
    }
];

// GET suggestions page
router.get('/', (req, res) => {
    res.render('destinations/index', { destinations: nepalDestinations });
});

// POST route to add custom new destination
router.post('/add', (req, res) => {
    const { name, tagline, description, image, vehicleType, vehicleCost, hotelName, hotelPrice } = req.body;
    
    const newDest = {
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        tagline,
        description,
        image: image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
        vehicles: [{ type: vehicleType || 'Bus / Jeep', cost: vehicleCost || 'N/R', route: 'Custom Route' }],
        hotels: [{ name: hotelName || 'Local Lodge', category: 'Standard', price: hotelPrice || 'N/R' }]
    };

    nepalDestinations.unshift(newDest);
    res.redirect('/explore');
});

module.exports = router;