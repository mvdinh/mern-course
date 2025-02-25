const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart/add
// @desc Add product to cart
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, userId, guestId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await getCart(userId, guestId);

        if (cart) {
            // If the cart exists, check if the product is already in cart
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.product.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                // If product exists, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // If not, add a new product entry
                cart.products.push({
                    product: productId,
                    name: product.name,
                    image: product.images?.[0]?.url || "",
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

            await cart.save();
            res.status(200).json(cart);
        } else {
            // Create a new cart
            const newCart = await Cart.create({
                userId: userId || undefined,
                guestId: guestId || "guest_" + new Date().getTime(),
                products: [
                    {
                        product: productId,
                        name: product.name,
                        image: product.images?.[0]?.url || "",
                        price: product.price,
                        size,
                        color,
                        quantity
                    }
                ],
                totalPrice: product.price * quantity // Ensure total is correctly assigned
            });

            res.status(201).json(newCart);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/cart
// @Update product quantity in cart
// @access Public
router.put("/", async (req, res) => {
    const {productId, quantity, size, color, userId, guestId} = req.body;

    try{
        let cart = await getCart(userId, guestId);
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        const productIndex = cart.products.findIndex(
            (p) =>
                p.product.toString() === productId &&
                p.size === size &&
                p.color === color
        )
        if (productIndex > -1) {
            // Update quantity
            if (quantity > 0){
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1); //Remove product if quantity is 0
            }
            
            cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({message: "Product not found in cart"});

        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
})

// @route DELETE /api/cart
// @desc Remove product from cart
// @access Public
router.delete("/", async (req, res) => {
    const {productId, size, color, userId, guestId} = req.body;
    try{
        let cart = await getCart(userId, guestId);
        if(!cart) return res.status(404).json({message: "Not found cart"});
        
        const productIndex = cart.products.findIndex(
            (p) =>
                p.product.toString() === productId &&
                p.size === size &&
                p.color === color
        )
        if (productIndex > -1) {
            
                cart.products.splice(productIndex, 1); //Remove product if quantity is 0
            
            cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({message: "Product not found in cart"});

        }
    
    }
    catch (err){
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }

})

// @route GET /api/cart/
// @desc Get cart by userId or guestId
// @access Public
router.get("/", async (req, res) => {
    const {productId, size, color, userId, guestId} = req.body;
    try{
        let cart = await getCart(userId, guestId);
        if (cart){
            res.status(200).json(cart);
        } else {
            return res.status(404).json({message: "Cart not found"});
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private

router.post("/merge", async(req, res) => {
    const { guestId } = req.body;
    try {
        // Find the guest cart and user cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ userId: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty" });
            }

            if (userCart) {
                // Merge guest cart into user cart
                guestCart.products.forEach((item) => {
                    const productIndex = userCart.products.findIndex(
                        (p) =>
                            p.product.toString() === item.product.toString() &&
                            p.size === item.size &&
                            p.color === item.color
                    );
                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += item.quantity;
                    } else {
                        // Otherwise, add the guest item to the cart
                        userCart.products.push(item);
                    }
                });

                userCart.totalPrice = userCart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
                await userCart.save();

                // Remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (err) {
                    console.log("Error removing guest cart:", err);
                }
                res.status(200).json(userCart);
            } else {
                // If the user has no existing cart, assign the guest cart to user
                guestCart.userId = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                // Guest cart has already been merged, return user cart
                res.status(200).json(userCart);
            } else {
                res.status(404).json({ message: "Guest cart not found" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;
