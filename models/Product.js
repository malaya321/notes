const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        ref: 'Category',
        required: true
    },
    imageUrl: {
        type: String,
        default: 'default_image_url.jpg'
    },
    quantity: {
        type: Number,
        default: 1
    },
    // ratings: [{
    //     user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    //     rating: {
    //         type: Number,
    //         min: 1,
    //         max: 5
    //     }
    // }],
    postedBy:{
        type:String,
        min:5,
        max:30,
        required:true 
    }
}, { timestamps: true });

module.exports = mongoose.model("products", ProductSchema);
