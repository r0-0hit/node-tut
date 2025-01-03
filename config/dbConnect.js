const mongoose = require('mongoose')

const dbConnect = async () => {
	try {
		//(node:17152) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
		// (Use `node --trace-warnings ...` to show where the warning was created)
		// (node:17152) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
		await mongoose.connect(process.env.MONGO_DB_URI)
	} catch (error) {
		console.error(error)
	}
}

module.exports = dbConnect
