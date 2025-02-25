const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: String,
    color: String,
    quantity: { type: Number, required: true, default: 1 }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return !this.guestId;  // Nếu không có guestId thì userId bắt buộc
        }
    },
    guestId: {
        type: String,
        required: function () {
            return !this.userId; // Nếu không có userId thì guestId bắt buộc
        }
    },
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

cartSchema.pre('save', function (next) {
    this.total = this.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
