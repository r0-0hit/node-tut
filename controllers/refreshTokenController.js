require('dotenv').config()
const jwt = require('jsonwebtoken')
const userData = require('../models/users.json')

const refreshToken = (req, res, next) => {
	const { cookies } = req
	if (!cookies?.jwt) return res.sendStatus(401)
	const cookieRefreshToken = cookies.jwt
	const user = userData.find(user => user.refreshToken === cookieRefreshToken)
	if (!user) return res.sendStatus(403) //forbidden

	//evaluate jwt
	jwt.verify(
		cookieRefreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || user.username !== decoded.username) res.sendStatus(403)
			const accessToken = jwt.sign(
				{ username: user.username },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30s' }
			)
			res.json({ accessToken })
		}
	)
}

module.exports = { refreshToken }
