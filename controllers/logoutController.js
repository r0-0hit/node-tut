const User = require('../models/User')

const logout = async (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204) //no content
	const cookieRefreshToken = cookies.jwt
	const user = await User.findOne({ refreshToken: cookieRefreshToken }).exec()
	if (!user) {
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		})
		return res.sendStatus(204)
	}
	try {
		user.refreshToken = ''
		await user.save()
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		})
		res.sendStatus(204)
	} catch (error) {
		console.error(error)
	}
}

module.exports = { logout }
