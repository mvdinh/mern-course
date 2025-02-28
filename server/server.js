const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoutes = require("./routes/subscriberRoutes")
const adminRoutes = require("./routes/Admin/adminRoutes")
const productAdminRoutes = require("./routes/Admin/productAdminRoutes")
const orderAdminRoutes = require("./routes/Admin/adminOrderRoutes")
const app = express();

// Middleware để parse JSON (express đã tích hợp sẵn)
app.use(express.json()); 

// Middleware để parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware cookie-parser để làm việc với cookies

// CORS configuration cho phép frontend từ localhost:3000
app.use(
    cors({
        origin: "http://localhost:3000", // Chỉ định frontend URL
        credentials: true,               // Cho phép gửi cookie
    })
);

//Connect Mongo
connectDB();

const port = process.env.PORT || 3001;

//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribeRoutes);

//API Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", orderAdminRoutes);

app.get("/", (req, res)=>{
    res.send("helo")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
