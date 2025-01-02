const User = require('../models/User')
const jwt = require('jsonwebtoken')

const refreshToken = async (req, res) => {
	const { cookies } = req
	if (!cookies?.jwt) return res.sendStatus(401)
	const cookieRefreshToken = cookies.jwt
	const user = await User.findOne({ refreshToken: cookieRefreshToken }).exec()
	if (!user) return res.sendStatus(403) //forbidden

	//evaluate jwt
	jwt.verify(
		cookieRefreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || user.username !== decoded.username) res.sendStatus(403)
			const roles = Object.values(user.roles)
			const accessToken = jwt.sign(
				{
					UserInfo: {
						username: user.username,
						roles: roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30s' }
			)
			res.json({ accessToken })
		}
	)
}

module.exports = { refreshToken }
