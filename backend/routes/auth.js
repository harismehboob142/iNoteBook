const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var secret = "This is business";
var fetchuser = require('../middleware/fetchuser')

// ROUTE 1
// create a user using : POST "/api/auth/createUser" doesn't requires Login
router.post('/createUser',
    //checking for validations 
    [body('name', 'Enter valid name').isLength({ min: 3 }), 
    body('email', 'Enter valid email').isEmail(), 
    body('password', 'Password must be 5 characters long').isLength({ min: 5 })],
    async (req, res) => {
        // checking if any error occurs in validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //creating user according to user schema
        // checking if a user with same email exists in User (database users)
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with same email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            // creating a new user with User.create and putting its data in user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, secret);
            res.json({ "authToken": authToken });
        }

        catch (error) {
            console.error = error.message;
            res.status(500).send("some error occurred in signup");
        }

    })
// ROUTE 2
// User login POST /api/auth/login. No Login Required
router.post('/login', [body('email', 'Enter valid email').isEmail(), body('password', 'Password must not be blank').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Incorrect Credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Incorrect Credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, secret);
            res.json({ "authToken": authToken });
        }
        catch (error) {
            console.error = error.message;
            res.status(500).send("some error occurred in login");
        }

    })

// Get logged in user details using POST /api/auth/getUser. Login Required 

router.post('/getUser', fetchuser,
    async (req, res) => {
        try {
            let userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(400).send({ error: "Error in get user route" })
        }
    })

module.exports = router;