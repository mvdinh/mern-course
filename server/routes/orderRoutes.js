const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const router = express.Router();

// @route GET /api/orders/my-orders
// @get Logged in user orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({
             createdAt: -1 
        });//sort by most recent orders
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route GET /api/orders/:id
// @get Order details by ID
// @access Private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        //return full order details
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }   
});

module.exports = router;