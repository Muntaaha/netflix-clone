const mongoose = require("mongoose")

const userWishlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    wishlistedMovies: Array,
});

module.exports = mongoose.model("user_wishlist", userWishlistSchema); 