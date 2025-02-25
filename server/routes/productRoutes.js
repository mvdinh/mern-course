const express = require("express");
const Product = require("../models/Product"); // Import Product model
const { protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private Admin
router.post("/create", protect,admin, async (req, res) => {
    try {
        const { 
            name, description, price, discountPrice, countInStock, sku, 
            category, brand, sizes, colors, collections, material, gender, 
            images, isFeatured, isPublished, tags, metaTitle, 
            metaDescription, metaKeywords, dimensions, weight 
        } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            user: req.user._id, // Lấy ID của user từ middleware
            metaTitle,
            metaDescription,
            metaKeywords,
            dimensions,
            weight
        });

        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/products/:id
// @desc Update Product
// @access Private Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const { 
            name, description, price, discountPrice, countInStock, sku, 
            category, brand, sizes, colors, collections, material, gender, 
            images, isFeatured, isPublished, tags, metaTitle, 
            metaDescription, metaKeywords, dimensions, weight 
        } = req.body;

        // Find product by ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product fields (only if provided in the request body)
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPrice = discountPrice || product.discountPrice;
        product.countInStock = countInStock || product.countInStock;
        product.sku = sku || product.sku;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.collections = collections || product.collections;
        product.material = material || product.material;
        product.gender = gender || product.gender;
        product.images = images || product.images;
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
        product.tags = tags || product.tags;
        product.metaTitle = metaTitle || product.metaTitle;
        product.metaDescription = metaDescription || product.metaDescription;
        product.metaKeywords = metaKeywords || product.metaKeywords;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;

        // Save the updated product
        const updatedProduct = await product.save();
        res.json({ message: "Product updated successfully", updatedProduct });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route DELETE /api/products/:id
// @desc Delete Product
// @access Private Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try{
        //Find product 
        const product = await Product.findById(req.params.id);
        if(product){
            //Remove product
            await product.deleteOne();
            res.json({message: "Delete Product successfully."})
        }else{
            return res.status(404).json({message:"Not found product."})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Sever Error"});
    }
});

// @route GET /api/products
// @desc Get all Product with option query filters
// @access Public
router.get("/", async (req, res) => {
    try {
        const {
            collections, size, color, gender, minPrice, maxPrice, sortBy,
            search, category, material, brand, limit
        } = req.query;

        let query = {};
        let sort = {}; // Khởi tạo biến sort trước khi sử dụng

        // Filter logic
        if (collections && collections.toLowerCase() !== "all") {
            query.collections = collections;
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.sizes = { $in: size.split(",") };
        }
        if (color) {
            query.colors = { $in: [color] };
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Sort Logic
        switch (sortBy) {
            case "priceAsc":
                sort = { price: 1 };
                break;
            case "priceDesc":
                sort = { price: -1 };
                break;
            case "popularity":
                sort = { rating: -1 };
                break;
            default:
                break;
        }

        // Fetch products and apply sorting and limit
        let products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);
            
        res.json(products); // Đổi `product` thành `products`

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});


// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller", async(req, res)=>{
    try{
        const bestSeller = await Product.findOne().sort({rating: -1});
        if(bestSeller){
            res.json(bestSeller);
        }else {
            res.status(404).json({message:"No Best Seller found."})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Sever Error")
    }
})

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/new-arrivals", async(req, res)=>{
    try{
        //Fetch latest 8 products
        const newArrivals = await Product.findOne().sort({createAt: -1}).limit(8);
        if(newArrivals){
            res.json(newArrivals);
        }else {
            res.status(404).json({message:"No newArrivals found."})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Sever Error")
    }
})

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            res.status(404).json({message:"Product not found."})
        }
        const similarProducts = await Product.find({
            _id: {$ne: id},  //Exclude the current product 
            gender: product.gender,
            category: product.category,
        }).limit(4);
        res.json(similarProducts)
    }
    catch(err){
        console.log(err);
        res.status(500).send("Sever Error")
    }
})

// @route GET /api/products/:id
// @desc Get a single Product by Id
// @access Public
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Thêm await

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (err) {
        console.error("Lỗi khi tìm sản phẩm:", err);
        res.status(500).json({ message: "Server Error" });
    }
});




module.exports= router;