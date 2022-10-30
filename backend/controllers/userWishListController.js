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
                await UserWishlist.findByIdAndUpdate(
                    user._id,
                    {
                        wishlistedMovies: [...user.wishlistedMovies, data],
                    },
                    { new: true }
                );
            }
            else{
                return res.status(401).json({msg: "Movie already in list"})
            }
        }
        else{
            await UserWishlist.create({email, wishlistedMovies: [data] });
            return res.status(200).json({msg: "Movie added to the list"})
        }
    } catch (error) {
        return res.status(401).json({msg: "Error adding to the list"})
    }
});