const { Schema, model } = require('mongoose')

const emoployeeSchema = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
})

module.exports = model('Employee', emoployeeSchema)
