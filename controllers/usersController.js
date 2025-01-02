const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userRegister = async (req, res) => {
	const { username, pwd } = req.body
	const saltRounds = 10
	// if (!username || !pwd) return res.sendStatus(400)
	if (!username || !pwd) {
		return res.status(400).json({
			sucess: false,
			message: 'Please provide USername and Password.',
			data: '',
		})
	}
	//same username check
	const duplicate = await User.findOne({ username: username }).exec()
	if (duplicate) {
		return res.status(400).json({
			sucess: false,
			message: 'Username already taken.',
			data: '',
		})
	}
	try {
		const hashedPwd = await bcrypt.hash(pwd, saltRounds)
		const user = {
			username: username,
			pwd: hashedPwd,
		}
		await User.create(user)
		res.status(200).json({
			sucess: true,
			message: 'User registered successfully.',
			data: user,
		})
	} catch (error) {
		console.error(error)
	}
}

const userLogin = async (req, res) => {
	const { username, pwd } = req.body
	if (!username || !pwd) {
		return res.status(400).json({
			sucess: false,
			message: 'Please provide Username and Password.',
			data: '',
		})
	}
	const user = await User.findOne({ username: username }).exec()
	if (!user) {
		return res.status(401).json({
			//Unauthorized
			sucess: false,
			message: 'Username not found.',
			data: '',
		})
	}
	const match = await bcrypt.compare(pwd, user.pwd)
	if (!match) {
		return res.status(401).json({
			sucess: false,
			message: 'Password does not match.',
			data: '',
		})
	} else {
		try {
			const roles = Object.values(user.roles)
			const accessToken = jwt.sign(
				{
					UserInfo: {
						username: user.username,
						roles: roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '1h' }
			)
			const refreshToken = jwt.sign(
				{ username: user.username },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: '5h' }
			)
			user.refreshToken = refreshToken
			await user.save()

			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				sameSite: 'None',
				secure: true,
				maxAge: 5 * 60 * 60 * 1000,
			})
			res.status(200).json({
				sucess: true,
				message: 'User login successfull.',
				data: user,
				accessToken: accessToken,
			})
		} catch (error) {
			console.error(error)
		}
	}
}

module.exports = {
	userRegister,
	userLogin,
}
