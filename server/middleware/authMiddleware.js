const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware bảo vệ route
const protect = async (req, res, next) => {
    let token;

    // Kiểm tra xem có header Authorization và có bắt đầu bằng "Bearer" không
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Lấy token từ header
            token = req.headers.authorization.split(" ")[1];

            // Giải mã token để lấy user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tìm user trong database bằng id từ token và loại bỏ trường password
            req.user = await User.findById(decoded.user.id).select("-password");
            console.log(req.headers.authorization)
            console.log(req.user)
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Not authorized, token failed." });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token provided." });
        console.log(req.headers.authorization)
    }
};

//Middleware to check if user is an Admin
const admin = async (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(403).json({message:"Not authrized as an admin"})
    }
}
module.exports = { protect , admin};
