const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Handle Registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.redirect('/auth/login');
    } catch (err) {
        res.status(400).send('Registration Error');
    }
});

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Handle Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/trips',
    failureRedirect: '/auth/login'
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/auth/login'));
});

module.exports = router;