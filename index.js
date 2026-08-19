const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Trip = require('./models/Trip');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trip_log_db';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({ 
    secret: process.env.SESSION_SECRET || 'secretkey', 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

app.use('/auth', require('./routes/auth'));
app.use('/explore', require('./routes/destination'));

app.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.render('trips', { trips });
    } catch (err) {
        res.status(500).send('Error retrieving trips');
    }
});

app.post('/trips/add', async (req, res) => {
    try {
        const { title, destination, startDate, endDate } = req.body;
        await Trip.create({ title, destination, startDate, endDate, owner: req.user ? req.user._id : null });
        res.redirect('/trips');
    } catch (err) {
        res.status(500).send('Error saving trip');
    }
});

app.post('/trips/delete/:id', async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id);
        res.redirect('/trips');
    } catch (err) {
        res.status(500).send('Error deleting trip');
    }
});

app.post('/trips/update/:id', async (req, res) => {
    try {
        const { title, destination, startDate, endDate } = req.body;
        await Trip.findByIdAndUpdate(req.params.id, { title, destination, startDate, endDate });
        res.redirect('/trips');
    } catch (err) {
        res.status(500).send('Error updating trip');
    }
});

app.get('/', (req, res) => {
    res.redirect('/explore');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));