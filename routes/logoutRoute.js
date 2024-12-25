const express = require('express')
const { logout } = require('../controllers/logoutController')

const router = express.Router()

router.route('/').get(logout)

module.exports = router
