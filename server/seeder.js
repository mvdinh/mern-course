const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

//connect to MongoDB
mongoose.connect(process.env.MONGO_DB);

//Function to seed data
const seedData = async()=>{
    try{
        //Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany(); 

        //Create default Admin user
        const createUser = await User.create({
            name:"Admin",
            email:"admin@gmail.com",
            password:"1",
            role:"admin"
        })

        //Assign the default user ID to each product
        const userID = createUser._id;
        const sampleProducts = products.map((product)=>{
            return{...product, user:userID};
        });

        //Insert product to database
        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully.");
        process.exit(0); // function thoát chương trình thành công
    }
    catch(err){
        console.log("Error seeding data:", err);
        process.exit(1); // function thoát chương trình thất bại
    }
};

seedData();