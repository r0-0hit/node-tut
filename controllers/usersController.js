const bcrypt = require('bcrypt')
const fs = require('fs').promises
const path = require('path')
const userData = require('../models/users.json')

const userRegister = async (req, res, next) => {
	const { username, pwd } = req.body
	const saltRounds = 10
	// if (!username || !pwd) return res.sendStatus(400)
	if (!username || !pwd) {
		return res.status(400).json({
			sucess: false,
            message:'Please provide USername and Password.',
			data: '',
		})
	}
	//same username check
	// if (userData.find(user => user.username === username)) return res.sendStatus(409) //conflict
	if (userData.find(user => user.username === username)) {
		return res.status(400).json({
			sucess: false,
            message:'Username already taken.',
			data: '',
		})
	}
	try {
		const hashedPwd = await bcrypt.hash(pwd, saltRounds)
        const user = {
            username: username,
            pwd: hashedPwd,
        }
		await fs.writeFile(
			path.join(__dirname, '..', 'models', 'users.json'),
			JSON.stringify([
				...userData,
				user,
			])
		)
		res.status(200).json({
			sucess: true,
            message:'User registered successfully.',
			data: user,
		})
	} catch (error) {
		console.error(error)
	}
	next()
}

const userLogin = async (req, res, next) => {
	const { username, pwd } = req.body
	if (!username || !pwd) {
		return res.status(400).json({
			sucess: false,
            message:'Please provide Username and Password.',
			data: '',
		})
	}
	const user = userData.find(user => user.username === username)
	if (!user) {
		return res.status(401).json({
			//Unauthorized
			sucess: false,
            message:'Username not found.',
			data: '',
		})
	}
    const match = await bcrypt.compare(pwd, user.pwd)
    if (!match) {
        return res.status(401).json({
			sucess: false,
            message:'Password does not match.',
			data: '',
		})
    } else {
        res.status(200).json({
			sucess: true,
            message:'User login successfull.',
			data: user,
		})
    }
	next()
}

module.exports = {
	userRegister,
	userLogin,
}
