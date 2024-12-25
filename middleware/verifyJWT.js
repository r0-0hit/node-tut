require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
	// const token = req.headers['authorization'].split(' ')[1]
	const authHeader = req.headers['authorization']
	// console.log(authHeader) //Berer token
	if (!authHeader) return res.sendStatus(401)
	const token = authHeader.split(' ')[1]
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403) //invalid token
		res.user = decoded.username
		next()
	})
}

module.exports = verifyJWT
