const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const { protect, admin } = require('../../middleware/authMiddleware');

//@route GET /api/admin/products
//@desc Get all products(admin only)
//@access Private Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//@route DELETE /api/admin/products/:id
//@desc Get all products(admin only)
//@access Private Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                } else{
                    await product.deleteOne();
                    res.json({ message: "Product deleted successfully" });
                }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


 
module.exports = router;