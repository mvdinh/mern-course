const express = require("express");
const Product = require("../models/Product"); 
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @ROUTE POST /api/checkout
// @DESC Create a new checkout session
// @ACCESS Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout." });
    }
    try {
        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isFinalized: false,
        });

        console.log(`Checkout created for user ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// @ROUTE PUT /api/checkout/:id/pay
// @DESC Update checkout to mark as paid after successful payment
// @ACCESS Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paidAt = Date.now();
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            const updatedCheckout = await checkout.save();
            res.status(200).json(updatedCheckout);
        } else {
            return res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// @ROUTE POST /api/checkout/:id/finalize
// @DESC Finalize checkout and convert to an order after payment confirmation
// @ACCESS Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            // Create final order based on the checkout details
            const finalOrder = new Order({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });
            
            await finalOrder.save();
            

            // Mark checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();
            res.status(201).json(finalOrder);

            // Delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });
        } else if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout already finalized" });
        } else {
            return res.status(400).json({ message: "Checkout not paid" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;