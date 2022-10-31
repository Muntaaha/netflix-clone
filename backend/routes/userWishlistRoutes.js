const express = require('express')
const router = express.Router()

const{ addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/userWishListController')

router.route('/addMoviesToWishlist').post(addToWishlist)

router.route('/getWishlist/:email').get(getWishlist)

router.route('/removeFromwishlist').put(removeFromWishlist)

module.exports = router