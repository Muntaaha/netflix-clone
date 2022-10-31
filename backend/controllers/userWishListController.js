const asyncHandler = require('express-async-handler')

const UserWishlist = require('../models/UserWishlistModel')


//@desc Wishlisted Movie added to the list
//@route POST 
//@access Private
module.exports.addToWishlist = asyncHandler(async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await UserWishlist.findOne({email});
        if(user){
            const { wishlistedMovies } = user;
            const alreadyInWishlist = wishlistedMovies.find(({id}) => id === data.id);
            if (!alreadyInWishlist) {
                const movieData = await UserWishlist.findByIdAndUpdate(
                    user._id,
                    {
                        wishlistedMovies: [...user.wishlistedMovies, data],
                    },
                    { new: true }
                );
                return res.status(200).json(movieData)
            }
            else{
                return res.status(401).json({msg: "Movie already in list"})
            }
        }
        else{
            const movieData = await UserWishlist.create({email, wishlistedMovies: [data] });
            return res.status(200).json(movieData)
        }
    } catch (error) {
        return res.status(401).json({msg: "Error adding to the list"})
    }
});

//@desc Get All Wished Movies
//@route POST 
//@access Private

module.exports.getWishlist = asyncHandler(async (req, res) => {
    try {
        const { email } = req.params;
        const user = await UserWishlist.findOne({ email });
        if(user){
            return res.json({msg: "Success", movies: user.wishlistedMovies })
        }
        else{
            return res.json({msg: "User with email not found"});
        }
    } catch (error) {
        return res.json({ msg: "Error Fetching" });
    }
});

//@desc Remove Movies from Wishlist
//@route POST 
//@access Private

module.exports.removeFromWishlist = async (req, res) => {
    try {
        const {email, MovieID} =req.body 
        const user = await UserWishlist.findOne({email});
        if (user) {
            const movies = user.wishlistedMovies;
            const movieIndex = movies.findIndex(({id}) => id === movieId);
            if(!movieIndex){
                res.status(400).send({msg:"Movie not found"})
            }
            movies.splice(movieIndex, 1);
            await UserWishlist.findByIdAndUpdate(
                user._id,
                {
                    wishlistedMovies: movies,
                },
                {new: true}
            );
            return res.json({msg: "Movie Successful", movies})
        }
        else{
            return res.json({msg: "User not found"})
        }
    } catch (error) {
        return res.json({msg: "error removing movie from the wishlist"})
    }
}