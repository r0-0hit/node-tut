const express = require('express')
const bcrypt = require('bcrypt')
const { userRegister, userLogin } = require('../controllers/usersController')

const router = express.Router()

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)

module.exports = router
