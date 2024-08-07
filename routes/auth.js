const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Admin Registration
router.get('/register/admin', (req, res) => {
    res.render('registerAdmin');
});

router.post('/register/admin', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newAdmin = new User({ username, password: hashedPassword, role: 'admin' });
    await newAdmin.save();
    res.redirect('/login');
});

// Regular User Registration
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, password: hashedPassword, role: 'user' });
    await newUser.save();
    res.redirect('/login');
});

// User Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user._id;
        req.session.userRole = user.role;
        res.redirect(user.role === 'admin' ? '/dashboard' : '/cars');
    } else {
        res.redirect('/login');
    }
});

// User Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
