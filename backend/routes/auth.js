const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Raviisagodb$oy'; // Define your JWT secret key
const fetchuser = require('../middleware/fetchuser')
// Route:1 - Create a new user
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Check if user with the same email exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User already exists" });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user in the database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        // Generate JWT token for authentication
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred")
    }
});

// Route:2 - Authenticate a user
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        // Compare hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        // Generate JWT token for authentication
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
});

// Route:3 - Get logged-in user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
 