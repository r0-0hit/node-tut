const express = require('express')
const path = require('path');
const router = express.Router()

router.route('/').get((req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'home.html'))
})

router.route('/about').get((req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'about.html'))
})

module.exports = router
