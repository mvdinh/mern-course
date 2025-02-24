const mongoose = require('mongoose'); // Import mongoose để làm việc với MongoDB
const bcrypt = require('bcryptjs'); // Import bcryptjs để hash mật khẩu

// Định nghĩa Schema cho User
const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, // Kiểu dữ liệu là chuỗi
            required: true, // Bắt buộc phải có giá trị
            trim: true // Tự động loại bỏ khoảng trắng ở đầu và cuối chuỗi
        },
        email: { 
            type: String, // Kiểu dữ liệu là chuỗi
            required: true, // Bắt buộc phải có
            unique: true, // Đảm bảo không có email trùng lặp
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"] // Regex kiểm tra định dạng email hợp lệ
        },
        password: { 
            type: String, // Kiểu dữ liệu là chuỗi
            required: true, // Bắt buộc nhập mật khẩu
            minLength: 1 // Độ dài tối thiểu của mật khẩu là 6 ký tự
        },
        role: {
            type: String, // Kiểu dữ liệu là chuỗi
            enum: ["customer", "admin"], // Chỉ chấp nhận 2 giá trị: 'customer' hoặc 'admin'
            default: "customer" // Giá trị mặc định là 'customer' nếu không được cung cấp
        }
    },
    {
        timestamps: true // Tự động thêm trường createdAt và updatedAt khi tạo hoặc cập nhật user
    }
);

// Middleware chạy trước khi lưu user vào database
userSchema.pre("save", async function (next) {
    // Nếu mật khẩu không thay đổi, bỏ qua bước hash và tiếp tục
    if (!this.isModified("password")) return next();
    
    // Tạo một chuỗi salt ngẫu nhiên để mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);

    // Hash mật khẩu của user bằng bcrypt và lưu lại
    this.password = await bcrypt.hash(this.password, salt);
    
    // Chuyển sang middleware tiếp theo
    next();
});

// Phương thức để so sánh mật khẩu nhập vào với mật khẩu đã hash trong database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Trả về true nếu mật khẩu khớp, ngược lại là false
};


module.exports = mongoose.model("User", userSchema);
