const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	roles: {
		User: {
			type: Number,
			default: 2001,
		},
		Editor: Number,
		Admin: Number,
	},
	pwd: {
		type: String,
		required: true,
	},
})

module.exports = model('User', userSchema)