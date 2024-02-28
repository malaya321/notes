const router = require("express").Router();
const Product = require('../models/Product');
const User = require("../models/User");

// Add Product
router.post("/addProduct", async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, quantity, postedBy } = req.body;
        
        if (!name || !description || !price || !category || !imageUrl || !quantity || !postedBy) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const product = new Product({
            name: name,
            description: description,
            price: price,
            category: category,
            imageUrl: imageUrl,
            quantity: quantity,
            postedBy: postedBy
        });

        const data = await product.save();
        res.status(200).json(product);
    } catch (e) {
        console.error("Error adding product:", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// GET all products
router.get('/getProduct/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        if(!currentUser){
            return res.status(400).json({ data: "User not found" });
        }
        const products = await Product.find({postBy:req.params.userId});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET a single product by ID
router.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
