const express = require('express')
const { saveUserDetails } = require('../controllers/users')
const router = express.Router()

router.route('/').post(saveUserDetails)


module.exports = router