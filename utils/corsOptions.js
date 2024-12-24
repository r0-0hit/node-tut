const whiteList = [
	'www.yourSite.com',
	'http://localhost:5000',
	'http://127.0.0.1:5000',
]
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || whiteList.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS!'))
		}
	},
}

module.exports = corsOptions