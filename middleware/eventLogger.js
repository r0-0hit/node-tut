const fs = require('fs').promises
const { log } = require('console')
const path = require('path')

const eventLogger = async (req, res, next) => {
	// console.log('in eventLogger ' + __dirname)
	const { method, url } = req
	const { statusCode } = res
	const date = new Date()
	const logsFolder = path.join(__dirname, '..', '/logs')
	const filePath = path.join(logsFolder, 'logs.txt')
	const message = `${date} - ${method} - ${url} - ${statusCode}\n`

	try {
		// if (!(await fs.access(logsFolder))) {
		//     await fs.mkdir(logsFolder)
		// }
		try {
			await fs.access(logsFolder)
		} catch {
			await fs.mkdir(logsFolder)
		}
		await fs.appendFile(filePath, message)
		next()
	} catch (error) {
		console.error(error)
	}
}

module.exports = eventLogger
