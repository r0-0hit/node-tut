const fs = require('fs').promises
const path = require('path')
const userData = require('../models/users.json')

const logout = async (req, res, next) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204) //no content
	const cookieRefreshToken = cookies.jwt
	const user = userData.find(user => user.refreshToken === cookieRefreshToken)
	if (!user) {
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		})
		return res.sendStatus(204)
	}
	try {
		await fs.writeFile(
			path.join(__dirname, '..', 'models', 'users.json'),
			JSON.stringify([
				...userData.map(user => {
					return user.refreshToken === cookieRefreshToken
						? {
								...user,
								refreshToken: '',
						  }
						: user
				}),
			])
		)
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
