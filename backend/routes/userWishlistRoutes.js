const express = require('express')
const router = express.Router()

const{ addToWishlist, getWishlist } = require('../controllers/userWishListController')

router.route('/addMoviesToWishlist').post(addToWishlist)

router.route('/getWishlist/:email').get(getWishlist)

module.exports = router