const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

//@ROUTE POST /api/subscribers
//@DESC handle newletter subscription
//@ACCESS Public
router.post('/', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        //Check email
        let subscriber = await Subscriber.findOne({ email }); 
        if (subscriber) {
            return res.status(400).json({ message: "Email already subscribed" });
        }

        //Create new subscriber
        subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;

