const express = require('express');
const router = express.Router();
const User = require("../model/user");


router.get('/users/topContributers', async (req, res) => {
    try {
        const users = await User.find().sort({ rewardPoints: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server Error" });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/search/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await User.find({email: userEmail});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
})

router.post('/users', async (req, res) => {
    try {
        const { displayName, email, rewardPoints, imageLink, workplace, location } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json(existingUser);
        }

        const newUser = new User({
            displayName,
            email,
            rewardPoints,
            imageLink,
            workplace,
            location
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create user" });
    }
});

router.put('/user/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const { displayName, rewardPoints, imageLink, workplace, location } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            {
                displayName,
                rewardPoints,
                imageLink,
                workplace,
                location
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to update user" });
    }
});


module.exports = router;
