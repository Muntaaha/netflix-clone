const express = require('express')
const router = express.Router()

const{ addToWishlist } = require('../controllers/userWishListController')

router.route('/').post(addToWishlist)

module.exports = router