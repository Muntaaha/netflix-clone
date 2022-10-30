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